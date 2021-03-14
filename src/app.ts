import * as mqtt from "mqtt";
import * as dotenv from "dotenv";

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER_PATH);

client.on("connect", () => {
  console.log("connected");
  client.subscribe("mqtt-client/#", (err) => {
    if (err) throw new Error("fail to subscribe");
  });
});

client.on("message", (topic, message) => {
  console.log(topic, message.toString());
});

const publishTest = () => {
  let count = 0;
  return () => client.publish("mqtt-client/test", String(count++));
};

setInterval(publishTest(), 1000);
