class SeatsHelper{
    convertSeatsArray(seats, rows, columns){
        let seatsArray = [];
        for (let i = 0; i < rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < columns; j++) {
                seatsArray[i].push(seats[i * columns + j]);
            }
        }
        return seatsArray;
    }

    flatSeatsArray = (seats) =>{
        return [].concat(...seats);
    }

    sortSeats = (seats) =>{
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

    getSeatsRowsNumber = (seats) =>{
        return seats[seats.length - 1].row + 1;
    }

    getSeatsColumnsNumber = (seats) =>{
        return seats[seats.length - 1].column + 1;
    }

    createSeatsArray(rows, columns){
        let seatsArray = [];
        for (let i = 0; i < rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < columns; j++) {
                seatsArray[i].push({
                    row: i,
                    column: j,
                    type:'default'
                });
            }
        }
        return seatsArray;
    }
}

const seatsHelper = new SeatsHelper();
 
export default seatsHelper;