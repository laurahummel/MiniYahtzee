import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFEFB',
        alignContent: 'center',
        justifyContent: 'center',
        
    },
    gameboard: {
        alignItems: 'center',
        justifyContent: 'center',    
        
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: '#5FC2C9',    
    },
    footer: {
        marginTop: 50,
    },
    title: {
        fontSize: 32,
        marginBottom: 22,
        marginTop: 22,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        color: '#fff'
    },
    author: {
        fontSize: 12,
        color: '#C9C9BA',
        alignSelf: 'center'
    },
    flex: {
        flexDirection: 'row',
        marginBottom:20,
        alignSelf: 'center'
    },
   
    
    row: {
        marginTop: 20,
        padding: 10,
        
    },
    gameinfo: {
        marginBottom: 15,
        alignSelf: 'center',
        fontSize: 18
    },
    button: {
        backgroundColor: '#5FC2C9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 50,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
    },
    points: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    numbers: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    sums: {
        
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 5
    },
    bonus: {
        fontSize: 14,
        alignSelf: 'center',
        marginBottom: 30
    }
})