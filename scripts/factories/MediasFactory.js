class MediasFactory {
    constructor(data, name) {
        if (data.image != undefined) {
            return new Picture(data, name)
        } else if (data.video != undefined) {
            return new Video(data, name)
        } else {
            throw 'Unknown type format'
        }
    }
}
