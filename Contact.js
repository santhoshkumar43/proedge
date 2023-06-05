import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { useState } from "react";
const Contact = ({ cnt }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (


    <View>
      <View style={styles.centeredView}>
        <Modal visible={selectedContact !== null} animationType="slide">
          <View style={styles.modalContainer}>
            <Image
              style={styles.selimg}
              source={{
                uri: `https://api.multiavatar.com/${selectedContact?.name}.png`,
              }}
            />
            <Text style={styles.modalTitle}>{selectedContact?.name}</Text>
            <Text >{selectedContact?.phoneNumbers && (
              <Text style={styles.modalDetails}>{selectedContact?.phoneNumbers[0].number}</Text>
            )}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        {cnt.map((contact) => (
          <TouchableOpacity key={contact.id} onPress={() => handleContactPress(contact)}>
            <View style={styles.box} key={contact.id}>
              <View style={styles.logo}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `https://api.multiavatar.com/${contact.name}.png`,
                  }}
                />

              </View>
              <View style={styles.num}>
                <Text style={styles.name} >{contact.name}</Text>
                {contact.phoneNumbers && (
                  <Text style={styles.no}>{contact.phoneNumbers[0].number}</Text>
                )}
              </View>

            </View>
          </TouchableOpacity>

        ))}
      </View>
    </View>
  )

}

const styles = StyleSheet.create({

  name: {
    fontWeight: 'bold',
    fontSize: 18,

  },
  no: {
    fontSize: 12,
    color: 'grey'


  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  box: {
    height: 60,
    backgroundColor: '#eaeaea',
    margin: 5,
    padding: 10,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",

  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  num: {
    marginLeft: 15
  },
  selimg:{
    height:100,
    width:100
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 20,
    
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 20,
    marginBottom: 30,
  },
  closeButton: {
    marginTop:30,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  }
});

export default Contact;
