const generateTileArr = () => {
	let newArr = [];
	for (let i = 0; i < 7; i++) {
		let firstNum = i;
		for (let i = firstNum; i < 7; i++) {
			newArr.push(`${firstNum},${i}`);
		}
	}
	return newArr; 
};

const assignTiles = (tilesArr, numOfTiles) => {
	let arr = [];
	for (let i = 0; i < numOfTiles; i++) {
		const random = Math.floor(Math.random() * tilesArr.length);
		if (arr.indexOf(tilesArr[random]) === -1) {
			arr.push(tilesArr[random]);
			tilesArr.splice(random, 1);
		} else {
			i--;
		}
	}
	return arr;
};

const logToConsole = (playerName, tilePlayed, boardTile) => {
	console.log(`${playerName} plays <${tilePlayed}> to connect to <${boardTile}> on the board `);
};

const addFromArrToBoard = (board, playedTile, playerArr, method, turnTile) => {
	const turnedTile = playedTile.split('').reverse().join('');
	const tileIndex = playerArr.indexOf(playedTile);
	if (method === 'unshift' && turnTile) {
		board.unshift(turnedTile);
	} else if (method === 'unshift' && !turnTile) {
		board.unshift(playedTile);
	} else if (method === 'push' && turnTile) {
		board.push(turnedTile);
	} else {
		board.push(playedTile)
	}
	console.log(`Board is ${board.map((el) => `<${el}>`)}`);
	playerArr.splice(tileIndex, 1);
};

const findMatchingTile = (arr, board) => {
		const firstNumMatchLastBoard = arr.find((el) => el[0] === board[board.length - 1][2]);
		const firstNumMatchFirstBoard = arr.find((el) => el[0] === board[0][0]);
		const lastNumMatchLastBoard = arr.find((el) => el[2] === board[board.length - 1][2]);
		const lastNumMatchFirstBoard = arr.find((el) => el[2] === board[0][0]);
		if (firstNumMatchLastBoard) return { tile: firstNumMatchLastBoard, method: 'push', turn: false };
		if (firstNumMatchFirstBoard) return { tile: firstNumMatchFirstBoard, method: 'unshift', turn: true };
		if (lastNumMatchLastBoard) return { tile: lastNumMatchLastBoard, method: 'push', turn: true };
		if (lastNumMatchFirstBoard) return { tile: lastNumMatchFirstBoard, method: 'unshift', turn: false };
};

const main = (playerArr, board, playerName, tiles) => {
	const playerHasTile = findMatchingTile(playerArr, board);
	if (playerHasTile) {
		logToConsole(playerName, playerHasTile.tile, board[0]);
		addFromArrToBoard(board, playerHasTile.tile, playerArr, playerHasTile.method, playerHasTile.turn);
	} else {
		const drawFromTiles = findMatchingTile(tiles, board);
		if (drawFromTiles) {
			console.log(`${playerName} can't play; draws <${drawFromTiles.tile}>`);
			addFromArrToBoard(board, drawFromTiles.tile, tiles, drawFromTiles.method, drawFromTiles.turn);
		} else {
			console.log('Game is a draw');
			gamePlaying = false;
		}
	}
};

let gamePlaying = true;
const tiles= generateTileArr()
const p1 = assignTiles(tiles, 7);
const p2 = assignTiles(tiles, 7);
const p1Name = 'Joe';
const p2Name = 'Jack';

let board = assignTiles(tiles, 1);
console.log(`The game starts with <${board[0]}>`);

while (gamePlaying) {
	main(p1, board, p1Name, tiles);
	main(p2, board, p2Name, tiles);
	if (p1.length === 0) {
		gamePlaying = false;
		console.log(`${p1Name} wins!`);
	} else if (p2.length === 0) {
		gamePlaying = false;
		console.log(`${p2Name} wins!`);
	}
}
