import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { config } from "dotenv";
import { getEnvVar } from "./utils/getEnvVar";
import { computeTenAverage } from "./utils/movingAverage";
import { findLastCleanTime } from "./utils/findLastCleanTime";

config();

const binHeight = 23; // cm
// const threshold = 0.8

interface sensor {
  talk: number;
  distance: number;
}

const url = getEnvVar("INFLUX_URL");
const token = getEnvVar("INFLUX_TOKEN");
const org = getEnvVar("INFLUX_ORG");
const bucket = getEnvVar("INFLUX_BUCKET");

const influxDB = new InfluxDB({ url, token });

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Trash Talk Documentation",
          version: "0.1.0",
        },
      },
    })
  )
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/data", () => {
    const queryApi = influxDB.getQueryApi(org);

    const query = `from(bucket: "${bucket}")
      |> range(start: -10m)
      |> filter(fn: (r) => r._measurement == "sensorData")
    `;

    return new Promise((res, rej) => {
      const result = new Map<string, sensor>();
      const distances: { datetime: string; value: number }[] = [];
      // let talkingRates: { datetime: string; value: number }[] = [];
      let temp: { datetime: string; value: number }[] = [];

      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          const data = `${o._time} ${o._measurement}: ${o._field} = ${o._value}`;
          console.log(data);
          if (result.get(o._time)) {
            let current = result.get(o._time);
            switch (o._field) {
              case "talk":
                if (current) {
                  current.talk = o._value;
                  // result.set(o._time, current);
                  temp.push({ datetime: o._time, value: o._value });
                }
                break;
              case "distance":
                if (current) {
                  current.distance = o._value;
                  result.set(o._time, current);
                  distances.push({ datetime: o._time, value: o._value });
                }
                break;
            }
          } else {
            switch (o._field) {
              case "talk":
                // result.set(o._time, { talk: o._value, distance: -1 });
                temp.push({ datetime: o._time, value: o._value });
                break;
              case "distance":
                // result.set(o._time, { talk: -1, distance: o._value });
                distances.push({ datetime: o._time, value: o._value });
                break;
            }
          }
        },
        error(error) {
          rej(error);
        },
        complete() {
          console.log("Query completed");
          console.log(result);
          console.log(distances);
          const talkingRates = computeTenAverage(temp);
          const lastCleanTime = findLastCleanTime(distances);
          const lastUpdateTime = talkingRates[talkingRates.length - 1].datetime;
          const percentage = distances[distances.length - 1].value;
          res({
            percentage,
            lastCleanTime,
            lastUpdateTime,
            rate: talkingRates,
            space: distances,
          });
        },
      });
    });
  })
  .post("/data", (req) => {
    // const data: sensor = req.body;
    const writeApi = influxDB.getWriteApi(org, bucket);

    if (!req.body.distance || !req.body.talk) {
      throw new Error("Fields missing");
    }

    const percentage = 100 - (req.body.distance / binHeight) * 100;

    const point = new Point("sensorData")
      .tag("location", "bin1")
      .floatField("distance", percentage)
      .floatField("talk", req.body.talk);

    writeApi.writePoint(point);

    writeApi
      .close()
      .then(() => {
        return point;
      })
      .catch((err) => {
        throw new Error(err);
      });
    // if (req.body.distance && req.body.distance < binHeight * threshold) {
    //   return false
    // }
    // return req.body
  })
  .listen(3000);

// Bun.serve({
//   fetch(req) {
//     const url = new URL(req.url)
//     if (url.pathname === '/') {return new Response()}
//     return new Response("404")

//   }
// })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(
  `
  Try this:
  
  \x1b]8;;http://${app.server?.hostname}:${app.server?.port}/swagger\x1b\\${app.server?.hostname}:${app.server?.port}/swagger\x1b]8;;\x1b\\`
);
