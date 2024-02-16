import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FavoriteMealCard = ({ title, subtitle, actionText, iconName, onActionPress }) => {
  return (
    <View style={styles.cardContainer}>

      <Icon name={iconName} size={24} color="#000" />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.cardAction}>{actionText}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  cardAction: {
    color: '#0000ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FavoriteMealCard;
