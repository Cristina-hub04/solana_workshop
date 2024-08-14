#![allow(dead_code)]

#[derive(Debug)]
struct Point {
    x: u64,
    y: u64,
}

#[derive(Debug)]
enum Message {
    Quit,
    Echo(String),
    //Move { x: i32, y: i32 },
    Move (Point),
    ChangeColor(i32, i32, i32),
    Resize {width: i32, height: i32},

    // TODO: Define the different variants used below.
}

impl Message {
    fn call(&self) {
        println!("{self:?}");
    }
}

fn main() {
    let messages = [
        Message::Resize {
            width: 10,
            height: 30,
        },
        Message::Move(Point { x: 10, y: 15 }),
        Message::Echo(String::from("hello world")),
        Message::ChangeColor(200, 255, 255),
        Message::Quit,
    ];

    for message in &messages {
        message.call();
    }
}
