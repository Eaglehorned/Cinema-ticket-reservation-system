export default class SeatsHelper{
    static convertSeatsArray(seats, rows, columns){
        let seatsArray = [];
        for (let i = 0; i < rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < columns; j++) {
                seatsArray[i].push(seats[i * columns + j]);
            }
        }
        return seatsArray;
    }

    static sortSeats = (seats) =>{
        return seats.sort((a, b) => {
            if (a.row === b.row){
                if (a.column > b.column){
                    return 1;
                }
                if (a.column < b.column){
                    return -1;
                } 
                return 0;
            }
            if (a.row > b.row){
                return 1;
            }
            return -1;
        });
    }

    static getSeatsRowsNumber = (seats) =>{
        return seats[seats.length - 1].row + 1;
    }

    static getSeatsColumnsNumber = (seats) =>{
        return seats[seats.length - 1].column + 1;
    }
}