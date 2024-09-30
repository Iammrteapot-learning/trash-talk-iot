export function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Env: ${name} is missing!`)
    }
    return value
}