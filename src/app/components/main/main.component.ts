import {
    Component,
    OnInit,
} from '@angular/core'
import { CellInterface } from '../../interfaces/cell.interface'
import { HoleGeneratorService } from '../../services/hole-generator.service'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    cellsArray: any[] = []
    cellsMultiArray: CellInterface[][] = []
    randomHolesArray: Array<number> = []

    holesNear: number = 0
    cell: CellInterface = {
        cellId: 0,
        holesNearCell: this.holesNear,
        hole: false,
        isClicked: false
    }
    cellId: number = 0
    cellsQuantity: number = 25
    holesQuantity: number = 8
    cellsRow: number = 5

    constructor(
        public randomHolesService: HoleGeneratorService,
    ) {}

    ngOnInit() {
        this.createPlayground()
    }

    createPlayground() {
        this.cellsArray = Array(this.cellsQuantity).fill(this.cell).map(() => {
            return {
                cellId: this.cellId++,
                holesNearCell: 0,
                hole: false,
            }
        })

        this.createHoles()

        while (this.cellsMultiArray.length != this.cellsRow) {
            let subArray = this.cellsArray.splice(0, this.cellsRow)
            this.cellsMultiArray.push(subArray)
        }
        console.log('Multi-arr', this.cellsMultiArray)
    }

    createHoles() {
        this.randomHolesArray = this.randomHolesService.getRandomHoles(this.cellsQuantity, this.holesQuantity)

        for (let i = 0; i < this.randomHolesArray.length; i++) {
            this.cellsArray[this.randomHolesArray[i]].hole = true
        }
    }

    chooseCell(cellsMultiArray: CellInterface[][], cellsRowIndex: number, cellIndex: number, cellsRow: CellInterface[]) {
        let prevRow = cellsMultiArray[cellsRowIndex - 1]
        let nextRow = cellsMultiArray[cellsRowIndex + 1]
        let possibleRowsWithHoles = [prevRow, cellsRow, nextRow]

        cellsRow[cellIndex].isClicked = true

        possibleRowsWithHoles.forEach((arr) => this.countHoles(arr, cellsRow, cellIndex) )
    }

    countHoles(cellsRow: CellInterface[], currentRow: CellInterface[], cellIndex: number) {
        for (let i = cellIndex - 1; i < cellIndex + 2; i++) {
            if (cellsRow != undefined && cellsRow[i] && cellsRow[i].hole ) {
                currentRow[cellIndex].holesNearCell++
            }
        }
    }
}
