//import libraries
import * as functions from "firebase-functions";
import server from "./server";
// import seedFunction from "./utils/seed";

//define google cloud function name
// export const seed = functions.https.onRequest(seedFunction);
export const api = functions.https.onRequest(server);
