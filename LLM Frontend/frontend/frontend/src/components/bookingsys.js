import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
//import RoomBookingContract_abi from "./contracts/x.json";
import RoomBookingContract_abi from "./xx.json";

import Box from "@mui/material/Box";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";
function Bookingsys() {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [account, setAccount] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    updateEthers();
  }, []);

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  let contractAddress = "0x2F7B4244c01c2b26E770f4c1aEfA480808431024";

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      RoomBookingContract_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const handleFloorSelect = (event) => {
    setSelectedFloor(event.target.value);
    setSelectedRoom("");
    setSelectedTime("");
  };

  const handleRoomSelect = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleTimeSelect = (event) => {
    setSelectedTime(event.target.value);
  };
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  const handleBooking = () => {
    if (!contract) return;
    if (!selectedRoom || !selectedTime) {
      setErrorMessage("Please select room and time");
      return;
    }
    contract
      .bookRoom(selectedRoom, selectedTime)
      .then(() => {
        console.log(`Booked room ${selectedRoom} at ${selectedTime}`);
        fetchBookingHistory(defaultAccount);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const fetchBookingHistory = (userAddress) => {
    if (!contract) return;
    contract
      .getBookingHistory(userAddress)
      .then((history) => {
        setBookingHistory(history);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const cancelBooking = (bookingId) => {
    if (!contract) return;
    contract
      .cancelBooking(bookingId)
      .then(() => {
        console.log(`Canceled booking with ID ${bookingId}`);
        fetchBookingHistory(defaultAccount);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const getRoomOptions = () => {
    switch (selectedFloor) {
      case "Level1":
        return [
          "BFH115",
          // Add more rooms for Level 1 as needed
        ];
      case "Level2":
        return [
          "BFH210",
          "Arcade Lab",
          // Add more rooms for Level 2 as needed
        ];
      case "Level3":
        return [
          "BFH310",
          "BFH320",
          "BFH324",
          // Add more rooms for Level 3 as needed
        ];
      case "Level4":
        return [
          "Grad Studio (BFH410)",
          "BFH410",
          "BFH420",
          "BFH430",
          "BFH424",
          "BFH450",
          "BFH460",
          "BFH470",
          // Add more rooms for Level 4 as needed
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      {" "}
      {/* Apply the container class */}
      <h1> BFH Space Reservation system</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <select
          value={selectedFloor}
          onChange={handleFloorSelect}
          style={{ height: "30px", width: "200px", marginBottom: "10px" }}
        >
          <option value="">Select a floor</option>
          <option value="Level1">Level 1</option>
          <option value="Level2">Level 2</option>
          <option value="Level3">Level 3</option>
          <option value="Level4">Level 4</option>
        </select>
        <select
          value={selectedRoom}
          onChange={handleRoomSelect}
          style={{ height: "30px", width: "200px", marginBottom: "10px" }}
        >
          <option value="">Select a room</option>
          {getRoomOptions().map((room, index) => (
            <option key={index} value={room}>
              {room}
            </option>
          ))}
        </select>
        <select
          value={selectedTime}
          onChange={handleTimeSelect}
          style={{ height: "30px", width: "200px", marginBottom: "10px" }}
        >
          <option value="">Select a time</option>
          <option value="8AM">8 AM</option>
          <option value="9AM">9 AM</option>
          <option value="10AM">10 AM</option>
          <option value="11AM">11 AM</option>
          <option value="12PM">12 PM</option>
          <option value="1PM">1 PM</option>
        </select>
        <AwesomeButton type="facebook" onPress={handleBooking}>
          Book Room
        </AwesomeButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          p={2}
          className="retro-box" // Add a class for retro style
          maxWidth="fit-content" // Set maximum width to fit the content
          margin="auto" // Center the box horizontally
          display="flex"
          flexDirection="column"
          alignItems="center" // Center the content vertically
          mb={2}
        >
          <p1>Account Address</p1>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            {account ? account : "0x..."}
          </span>
        </Box>{" "}
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          p={2}
          className="retro-box" // Add a class for retro style
          maxWidth="fit-content" // Set maximum width to fit the content
          margin="auto" // Center the box horizontally
          display="flex"
          flexDirection="column"
          alignItems="center" // Center the content vertically
        >
          <p1>Booking History</p1>

          <ul>
            {bookingHistory.map((booking) => (
              <li key={booking.bookingId}>
                Room: {booking.room}, Time: {booking.time}
                <button onClick={() => cancelBooking(booking.bookingId)}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <AwesomeButton type="danger" onPress={handleBooking}>
              Cancel
            </AwesomeButton>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Bookingsys;
