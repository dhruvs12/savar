import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SwipeableFoodItem = ({ foodItem, onDelete }) => {
  const rightSwipeActions = () => {
    return (
      <TouchableOpacity onPress={onDelete} style={styles.deleteBox}>
        <Icon name="trash-can-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      overshootRight={false}
      containerStyle={styles.container}
    >
      <View style={styles.foodItem}>
        <Text style={styles.foodName}>{foodItem.name}</Text>
        <Text style={styles.foodGramWeight}>{foodItem.amount} {foodItem.unit}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 4, // Add some vertical margin for separation
  },
  foodItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    borderRadius: 10,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: '100%', // Make sure the button fills the swipe area vertically
  },
  foodName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  foodGramWeight: {
    fontSize: 16,
    color: '#666',
  },
});

export default SwipeableFoodItem;
