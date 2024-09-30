import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { config } from "dotenv";
import { getEnvVar } from "./utils/getEnvVar";

config();

// const binHeight = 100
// const threshold = 0.8

interface sensor {
  ldr: number;
  uv: number;
}

const url = getEnvVar("INFLUX_URL");
const token = getEnvVar("INFLUX_TOKEN");
const org = getEnvVar("INFLUX_ORG");
const bucket = getEnvVar("INFLUX_BUCKET");

const influxDB = new InfluxDB({ url, token })

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
      |> range(start: -24h)
      |> filter(fn: (r) => r._measurement == "sensorData")
    `;

    return new Promise((res, rej) => {

      const result = new Map<string, sensor>();
  
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          const data = `${o._time} ${o._measurement}: ${o._field} = ${o._value}`;
          console.log(data);
          if (result.get(o._time)) {
            let current = result.get(o._time);
            switch (o._field) {
              case 'ldr':
                if (current) {
                  current.ldr = o._value
                  result.set(o._time, current)
                }
                break
              case 'uv':
                if (current) {
                  current.uv = o._value
                  result.set(o._time, current)
                }
                break
            }
          } else {
            switch (o._field) {
              case 'ldr':
                result.set(o._time, {ldr: o._value, uv: -1})
                break
              case 'uv':
                result.set(o._time, {ldr: -1, uv: o._value})     
                break       
            }
          }
        },
        error(error) {
          rej(error)
        },
        complete() {
          console.log('Query completed')
          console.log(result)
          res(Array.from(result.entries()))
        }
      })  
    })
  })
  .post("/data", (req) => {
    // const data: sensor = req.body;
    const writeApi = influxDB.getWriteApi(org, bucket);
    
    if (!req.body.uv || !req.body.ldr) {
      throw new Error('Fields missing')
    }

    const point = new Point('sensorData')
      .tag('location', 'bin1')
      .floatField('uv', req.body.uv)
      .floatField('ldr', req.body.ldr);

    writeApi.writePoint(point);

    writeApi.close()
      .then(() => {
        return point
      })
      .catch((err) => {
        throw new Error(err)
      })
    // if (req.body.uv && req.body.uv < binHeight * threshold) {
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
  
  \x1b]8;;http://${app.server?.hostname}:${app.server?.port}/swagger/\x1b\\${app.server?.hostname}:${app.server?.port}/swagger\x1b]8;;\x1b\\`
);
