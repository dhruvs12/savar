import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { initHealthKit, fetchSleepData } from '../../api/AppleHealth';

const InsightsScreen = () => {
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        initHealthKit();
    }, []);

    const handleFetchSleepData = () => {
        const options = {
            startDate: (new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).toISOString(),  // Last week
            endDate: new Date().toISOString(),  // Today
        };

        fetchSleepData(options)
            .then(data => {
                setSleepData(data);
                console.log("Sleep data fetched successfully:", data);
            })
            .catch(error => {
                console.error("Error fetching sleep data:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sleep Data Insights</Text>
            <Button title="Fetch Sleep Data" onPress={handleFetchSleepData} />
            {Object.keys(sleepData).length > 0 ? (
                Object.keys(sleepData).map(date => (
                <View key={date}>
                    <Text style={styles.date}>{date}</Text>
                    {sleepData[date].map((item, index) => (
                        <View key={index} style={styles.sleepItem}>
                            <Text>Start: {item.startDate}</Text>
                            <Text>End: {item.endDate}</Text>
                            <Text>Type: {item.value}</Text>
                        </View>
                    ))}
                </View>
            ))
        ) : (
            <Text>No sleep data available.</Text>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sleepItem: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default InsightsScreen;
