import crypto from "crypto";

export default function getRandomName() {
    return crypto.randomBytes(16).toString("hex");
}