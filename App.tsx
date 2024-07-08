import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleIncrement = (): void => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      console.log('Counter:', newCounter);
      return newCounter;
    });
  };

  const handleDecrement = (): void => {
    setCounter(prevCounter => {
      const newCounter = prevCounter > 0 ? prevCounter - 1 : 0;
      console.log('Counter:', newCounter);
      return newCounter;
    });
  };

  const handleReset = (): void => {
    setCounter(0);
    console.log('Counter:', 0);
  };

  const startIncrement = (): void => {
    handleIncrement();
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(handleIncrement, 100);
  };

  const startDecrement = (): void => {
    handleDecrement();
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(handleDecrement, 100);
  };

  const stop = (): void => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{counter}</Text>
      <TouchableOpacity
        style={styles.add}
        onPress={handleIncrement}
        onLongPress={startIncrement}
        onPressOut={stop}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.add} onPress={handleReset}>
        <Text style={styles.addText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.add}
        onPress={handleDecrement}
        onLongPress={startDecrement}
        onPressOut={stop}
      >
        <Text style={styles.addText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    borderWidth: 1,
    height: 70,
    width: 101,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    marginTop: 11,
    backgroundColor: 'orange'
  },
  addText: {
    fontSize: 33,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  },
});
