import { web } from "./app/web.js";
import { logger } from "./app/logging.js";
import dotenv from "dotenv";

dotenv.config();

const port = 8080|| process.env.PORT;

web.listen(port, () => {
  console.log(`Server running on ${port}`);
  logger.info("App start");
});
