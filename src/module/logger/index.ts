import loggger from "./logger.js";

export default {
  app: new loggger("app"),
  bd: new loggger("bd"),
  express: new loggger("express"),
};
