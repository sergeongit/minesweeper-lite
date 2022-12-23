import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class HoleGeneratorService {

    constructor() {}

    getRandomHoles(allCells: number, holes: number) {
        let idArray: Array<number> = []

        while (idArray.length < holes) {
            let randomHole = Math.floor(Math.random() * allCells)
            let check = idArray.find(item => item === randomHole)
            !check ? idArray.push(randomHole) : null
        }

        return idArray
    }
}
