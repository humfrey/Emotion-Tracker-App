import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getEmotionHistory, deleteEmotionByTimestamp } from '../utils/database';

const formatDate = (timestamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
    
    // Use Intl.DateTimeFormat to format the date and time
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // use true for AM/PM format, false for 24-hour format
    }).format(date);
  
    return formattedDate;
  };  

const EmotionHistoryScreen = ({ navigate }) => {
    const [emotionHistory, setEmotionHistory] = useState([]);

    const fetchHistory = async () => {
        const history = await getEmotionHistory();
        setEmotionHistory(history);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDeleteRecord = async (timestamp) => {
        await deleteEmotionByTimestamp(timestamp);
        await fetchHistory(); // Refresh the list after deletion
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigate('HomeScreen')}>
                    <Text style={styles.backButton}>Go Back</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Emotion History</Text>
                {emotionHistory.length === 0 ? (
                    <Text style={styles.noDataText}>No emotion records found.</Text>
                ) : (
                    [...emotionHistory] // Create a copy of the array
                    .reverse() // Reverse the order of the copied array
                    .map((record, index) => (
                        <View key={index} style={styles.recordItem}>
                            <Text style={styles.emotionText}>{record.emotion}</Text>
                            <Text style={styles.timestampText}>{formatDate(record.timestamp)}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteRecord(record.timestamp)}
                            >
                                <Text style={styles.deleteButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    recordItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        flexDirection: 'row', // Add this line to layout items horizontally
        alignItems: 'center', // Center items vertically in the row
        justifyContent: 'space-between', // Space out the emotion text and the delete button
    },
    deleteButton: {
        marginLeft: 10, // Add some space between the text and the button
    },
    deleteButtonText: {
        color: 'grey', // Set the "X" color to grey
        fontWeight: 'bold', // Optionally, make the "X" bold
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    topBar: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    backButton: {
        color: '#666',
        fontSize: 18,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    noDataText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    emotionText: {
        fontSize: 18,
    },
    timestampText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default EmotionHistoryScreen;
