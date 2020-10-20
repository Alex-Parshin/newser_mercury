'use strict'

import * as amqp from 'amqplib/callback_api'
import { Sleep } from './utils';

export async function GetData(queue, callback) {
    amqp.connect('amqp://admin:admin@10.19.19.4:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(async function(error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queue, {
                durable: true
            });
            channel.prefetch(1);
            console.log(`${new Date()} Ожидаю новых собщений`);
            channel.consume(queue, async function(msg) {
                await callback(JSON.parse(msg.content.toString()))
                await Sleep(1000)
                channel.ack(msg)
            });
        });
    });
}

export async function SendData(data, queue) {
    console.log(global.app.cli.green(`${new Date()} Отправляю ${data.title}`))
    try {
        await new Promise(async(resolve, reject) => {
            amqp.connect(`amqp://admin:admin@10.19.19.4:5672`,
                function(error0, connection) {
                    if (error0) {
                        reject(error0)
                        return
                    }
                    connection.createChannel(function(error1, channel) {
                        if (error1) {
                            reject(error1)
                            return
                        }
                        channel.assertQueue(queue, {
                            durable: true
                        });
                        channel.prefetch(1);
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
                        resolve()
                    });
                })
        })
    } catch (err) {
        console.log(err)
        return
    }
}