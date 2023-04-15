import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import ProfilePicture from "../../assets/ProfilePicture.png";
import { Alert } from "react-native";
import AddPhoto from "../../components/AddPhoto";

let componentWidth = 0;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function EditProfile({ navigation, route }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filled, setFilled] = useState(false);
  const [image, setImage] = useState(route.params.image);
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.token;

  useEffect(() => {
    if (fullName !== "" && phoneNumber !== "") {
      setFilled(true);
    }
  }, [fullName, phoneNumber]);

  //changing state function
  function fullNameHandler(enteredName) {
    setFullName(enteredName);
  }

  function phoneNumberHandler(enteredPhoneNumber) {
    setPhoneNumber(enteredPhoneNumber);
  }

  function measureView(event) {
    componentWidth = event.nativeEvent.layout.width;
  }

  function goBack() {
    navigation.navigate("Tab");
  }

  //create profile fuction
  async function updateProfileAttempt() {
    if(fullName === authCtx.display_name){
      setFullName("");
      Alert.alert("Same Display name","Please enter a new display name that is different from your current display name",[{text:"OK",style:"destructive"}]);
    }
    else if (fullName !== "" && phoneNumber !== "") {
      const token = await updateAccount(authCtx.token, fullName,image);
      authCtx.handleDisplayName(fullName);
      Alert.alert("Successful","Profile updated successfully!",[{text:"OK",onPress:()=>{navigation.navigate("Profile")}}]);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() =>
      Keyboard.dismiss()
    }>
      <View> 
        <View style={styles.topContent}>
            <IconButton
                onPress={goBack}
                icon="arrow-back"
                size={28}
                color="black"
            />
          <Text
            style={styles.title}
            onLayout={(event) => {
              measureView(event);
            }}
          >
            Edit Profile
          </Text>
        </View>
        {(!image && image === "") ? 
        <View style={styles.imageButton}>
          <AddPhoto />
        </View> : <Image source={image} style={{width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginTop: 40}}/>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={fullNameHandler}
            placeholder="New Display Name here.."
            value={fullName}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={phoneNumberHandler}
            placeholder="New Phone Number here.."
            value={phoneNumber}
            keyboardType="decimal-pad"
            maxLength={8}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onSuccess={filled}
            onAttempt={updateProfileAttempt}
            text="Update Profile"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  topContent: {
    flexDirection: "row",
    marginTop: 30,
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
    top: height / 50,
    marginRight: width / 3.1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    marginBottom: 50,
  },
  title: {
    marginLeft: (width - componentWidth) / 5,
    marginTop: 40,
    fontSize: 20,
    fontFamily: "OpenSans_700Bold"
  },
  imageButton:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputText: {
    width: "95%",
    backgroundColor: "white",
    borderColor: "#A7B2BA",
    borderWidth: 2,
    color: "grey",
    padding: 15,
    borderRadius: 12,
    fontSize: 13,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  buttonContainer: {},
});
