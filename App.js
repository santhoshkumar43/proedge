import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView,TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import Contact from "./Contact";
import { Modal } from 'react-native';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };
  const handleSearch = (text) => {
    const filtered = contacts.filter(
      (contact) =>
      
        contact.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredContacts(filtered);
  };

  useEffect(() => {
    loadContacts();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Contact List</Text>

      <TextInput
        style={{ height: 40, borderColor: 'grey', borderWidth: 1, borderRadius:6 , margin: 10, paddingHorizontal: 10 }}
        placeholder="Search contacts..."
        onChangeText={handleSearch}
      />

      <ScrollView>
        <Contact cnt={filteredContacts.length <1 ? contacts :  filteredContacts} />
      </ScrollView>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

});

export default App;
