class MediasFactory {
    constructor(data, name) {
        if (data.image != undefined) {
            return new PhotographerImage(data, name)
        } else if (data.video != undefined) {
            return new PhotographerVideo(data, name)
        } else {
            throw 'Unknown type format'
        }
    }
}
