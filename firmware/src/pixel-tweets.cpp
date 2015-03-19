// This #include statement was automatically added by the Spark IDE.
#include "SparkButton/SparkButton.h"
SparkButton button = SparkButton();

void setup() {

    button.begin();
    Spark.function("pixel", pixel);
    Serial.begin(9600);
}

void loop() {


}

int pixel(String command) {

    int colon = command.indexOf(":");
    int first = command.indexOf(",");
    int second = command.indexOf(",", first + 1);

    int led = command.substring(0, colon).toInt();
    int r = command.substring(colon + 1, first).toInt();
    int g = command.substring(first + 1, second).toInt();
    int b = command.substring(second + 1).toInt();
    button.ledOff(led);
    delay(20);
    button.ledOn(led, r, g, b);
    return 0;
}