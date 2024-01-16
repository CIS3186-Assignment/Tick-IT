import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IconButton } from "react-native-paper";
import customTheme from "../theme";

const TransactionEntry = ({ item }) => {
  const groupedEventDetails = item.eventDetails.reduce((acc, curr) => {
    acc[curr.eventDetails.name] = (acc[curr.eventDetails.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style={styles.entryContainer}>
      {Object.entries(groupedEventDetails).map(([eventName, count], index) => {
        return (
          <View key={index} style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              {count === 1 && (
                <IconButton
                  icon="ticket"
                  size={40}
                  iconColor={customTheme.colors.primary}
                  style={styles.icon}
                />
              )}
              {count > 1 && (
                <>
                  <IconButton
                    icon="ticket"
                    size={40}
                    style={styles.icon}
                    iconColor={customTheme.colors.primary}
                  />
                  <IconButton
                    icon="ticket"
                    size={40}
                    iconColor={customTheme.colors.primary}
                    style={[styles.icon, styles.iconOverlap]}
                  />
                </>
              )}
            </View>
            <Text style={[styles.text, styles.textWrap]}>
              {eventName} (x{count})
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 10,
    backgroundColor: customTheme.colors.background,
    borderTopWidth: 1,
    borderColor: customTheme.colors.primary,
    width: "100%",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  text: {
    color: customTheme.colors.onPrimary,
    paddingHorizontal: 5,
    marginLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    color: customTheme.colors.onPrimary,
  },
  iconOverlap: {
    marginLeft: -20,
  },
  textWrap: {
    flexShrink: 1,
  },
});

export default TransactionEntry;
