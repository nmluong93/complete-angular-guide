
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, desc: string, imagePath: string) {
        this.description = desc;
        this.name = name;
        this.imagePath = imagePath;
    }
}