import React, { useState, useEffect,} from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/styles'


let board = [];
let diceValues = [];
let diceSums = [0, 0, 0, 0, 0, 0];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;

let willGetBonus = false;

export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrofThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [bonusStatus, setBonusStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumber, setSelectedNumber] = useState(new Array(6).fill(false));
    const [total, setTotal] = useState(0);
    const [bonus, setBonus] = useState(63);
    const [buttonText, setButtonText] = useState('THROW DICES');



    //Initialize function for new game
    function initialize(){
        setNbrofThrowsLeft(NBR_OF_THROWS);
        setStatus('Game has not started');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setSelectedNumber(new Array(6).fill(false));
        setTotal(0);
        setBonus(63);
        setButtonText('THROW DICES');
        diceSums = [0, 0, 0, 0, 0, 0];
        willGetBonus= false;
    }



    //Throw Dices
    function throwDices () {
        if (buttonText === 'NEW GAME') {
            initialize()

        } else if (nbrOfThrowsLeft===0) {
            setStatus("Select your points before next throw")
        }
        else {
            for (let i = 0; i<NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random()*6+1);
                    board[i] = 'dice-' + randomNumber;
                    diceValues[i] = randomNumber;
                }
            }
            setNbrofThrowsLeft(nbrOfThrowsLeft-1);
        }
    }
    


    
    //Function to select Dices
    function selectDice(i) {
        if (nbrOfThrowsLeft=== NBR_OF_THROWS) {
            setStatus("You have to throw dices first")
        }else{
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
        }
    }
    //Change Dice Color on press
    function getDiceColor(i) {
        return selectedDices[i]? "#DB518E" : "#F7B6D4" ;  
    }



    //Function to select Numbers 
    function selectNumber(n) {
       
       if (nbrOfThrowsLeft > 0) {
            setStatus("Throw 3 times before setting points")
        } else if (!selectedNumber[n]) {
            let number = [...selectedNumber];
            number[n] = true;
            setSelectedNumber(number);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            var tempSum = 0;
            for (let i = 0; i < 6; i++) {
                if (n === diceValues[i]) {
                    tempSum += diceValues[i];
                }
            }
            diceSums[n - 1] = tempSum;
            setTotal(total + tempSum);
            setNbrofThrowsLeft(3);
            setBonus(bonus - tempSum);
            getBonus();
        } else {
            setStatus("You already selected points for "+[n])
        }  

    }


    //Change Number Color on press
    function getNumberColor(n) {
        return selectedNumber[n]? "#ff8943" : "#FFD9C3"; 
    }


  
    //Function for getting the bonus
    function getBonus() {
        if (bonus > 0) {
            setBonusStatus('You are '+ bonus +' points away from bonus');
        } else if (bonus <= 0) {
            setBonusStatus('You got the bonus!')
            willGetBonus = true;
        }
        
    }
    

    //Check Winner and set status
    function checkWinner() {
        if (nbrOfThrowsLeft === 0){
            setStatus('Select your points');
            
            
        }
        else {
            setStatus('Select and throw dices again');
        }
    }



    // Set Status, Number of Throws and Button Text
    useEffect( () => {
        checkWinner();
        getBonus();
        
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices!');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrofThrowsLeft(NBR_OF_THROWS-1);
        }
        if (selectedNumber[1] === true && selectedNumber[2] === true && selectedNumber[3] === true && selectedNumber[4] === true && selectedNumber[5] === true && selectedNumber[6] === true){
            setStatus('All points selected. Game over.');
            setButtonText('NEW GAME');
        }
    }, [nbrOfThrowsLeft, selectedNumber, buttonText]);




    //Dice Icons in a row with Pressable (appearence)
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={()=> selectDice(i) }>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row"+i}
                    size={55}
                    color={getDiceColor(i)}>
             </MaterialCommunityIcons>
            </Pressable>
        );
    }

    //Number Icons in a row with Pressable (appearence)
    const numbers = [];
    for (let n = 1; n < 7; n++) {
        numbers.push(
            <View key={"key" + n}>
                <Text style={styles.sums}>{diceSums[n - 1]}</Text>
                <Pressable
                    key={"numbers" + n}
                    onPress={() => selectNumber(n)}>
                    <MaterialCommunityIcons
                        name={"numeric-" + n + "-circle"}
                        key={"numbers" + n}
                        size={40}
                        color={getNumberColor(n)}
                        style={styles.numbers}>
                    </MaterialCommunityIcons>
                </Pressable>
            </View>
        );
    }


    return(
        <View sytle={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>
                        {buttonText}
                    </Text>
            </Pressable>
            <Text style={styles.points}>Total: {willGetBonus ? total + 35 : total}</Text>
            <Text style={styles.bonus}> {bonusStatus} </Text>
            <View style={styles.gameboard}>
            <View style={styles.flex}>{numbers}</View>
            </View>
            
        </View>
    )
}