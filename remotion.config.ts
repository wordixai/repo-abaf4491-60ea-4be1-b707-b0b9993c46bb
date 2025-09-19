import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setConcurrency(8);
Config.setCodec("h264");
Config.setImageSequence(false);

export default Config;