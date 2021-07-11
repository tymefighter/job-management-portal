import * as types from "./types";
import * as fs from "fs";

/** Data */

const DATA_PATH = "./data/companies.json";
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as types.Company[];

/** Helpers */

function writeDataToFile() {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), "utf-8");
}

export function addCompany() {

}
