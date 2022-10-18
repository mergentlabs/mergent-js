import { serialize } from "tinyduration";
import type Duration from "./types/Duration";

export const iso8601Duration = (duration: Duration) => serialize(duration);

export default {};
