import { useState, useEffect } from 'react';
import arrow from './assets/images/icon-arrow.svg';
import topImageMobile from './assets/images/pattern-bg-mobile.png';
import topImageDesktop from './assets/images/pattern-bg-desktop.png'; // ✅ Import desktop image
import './App.css';
import Footer from './components/Footer';
import { Box, Flex, Text, Button, useBreakpointValue, Heading, Textarea } from '@chakra-ui/react';

function App() {
  // State to store the IP address input by the user
  const [ipAddress, setIpAddress] = useState('');
  // State to store the data fetched from the geo.ipify API
  const [data, setData] = useState({
    ip: 'To be shown...',
    location: { city: 'To be shown...', region: 'To be shown...', country: 'To be shown...', timezone: 'To be shown...' },
    isp: 'To be shown...',
  });
  // State to store the initialized Leaflet map
  const [map, setMap] = useState(null);

  // Hook to provide responsive values for the width based on the viewport size. base: 0px and up (typically for mobile devices)  md: 48em (768px) and up (medium devices like tablets) but also is prepared for desktop or larger monitors.
  const width = useBreakpointValue({ base: '80%', md: '800px' }); // ✅ Updated width for the input
  const boxHeight = useBreakpointValue({ base: '25rem', md: '15rem' }); // ✅ Adjust height based on breakpoint
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' }); // ✅ Change direction based on breakpoint
  const flexHeight = useBreakpointValue({ base: '25rem', md: '6rem' }); // ✅ Adjust Flex height based on breakpoint
  const backgroundImage = useBreakpointValue({ base: `url(${topImageMobile})`, md: `url(${topImageDesktop})` }); // ✅ Change background image based on breakpoint

  // Function to fetch data from the geo.ipify API
  const fetchData = async (ip) => {
    try {
      // Fetch data from the API using the provided IP address
      const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_UsUbJFG3s8zzwGG5RJHlkMG0zCs5d&ipAddress=${ip}`);
      const data = await response.json(); // Convert the response to JSON
      setData(data); // Update the data state with the fetched data
      setIpAddress(data.ip); // Update the input field with the fetched IP address
      if (map) {
        map.setView([data.location.lat, data.location.lng], 13); // Adjust the map view based on the fetched location
      }
    } catch (error) {
      console.error('Error fetching IP data:', error);
    }
  };

  // Hook to initialize the Leaflet map when the component mounts
  useEffect(() => {
    // Ensure the code only runs in the browser environment and Leaflet is available
    if (typeof window !== 'undefined' && window.L) {
      const L = window.L; // Access Leaflet from the global scope

      // Check if the map has already been initialized before trying to create a new one
      if (!document.getElementById('map')._leaflet_id) {
        // Initialize the map and set its view to a default location (latitude, longitude) and zoom level
        const initializedMap = L.map('map').setView([51.505, -0.09], 13);

        // Add a tile layer to the map using OpenStreetMap tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, // Set the maximum zoom level for the map
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // Add attribution for the map tiles
        }).addTo(initializedMap); // Add the tile layer to the map

        setMap(initializedMap); // Set the initialized map to state
      }
    }
  }, []); // Run this effect only once, when the component mounts

  // Function to handle the search button click
  const handleSearch = () => {
    fetchData(ipAddress); // Fetch data on button click using the input IP address
  };

  return (
    <Flex width="100vw" minH="100vh" direction="column" align="center" bg="black" py="0rem" zIndex="0">
      <Box
        minW="100%"
        height={boxHeight} // ✅ Use responsive height
        textAlign="center"
        textColor="hsl(150, 100%, 66%)"
        fontSize="2rem"
        fontWeight={800}
        backgroundImage={backgroundImage} // ✅ Use responsive background image
        backgroundSize="cover"
      ></Box>
      <Box
        width="100%"
        height="32rem"
        textAlign="center"
        textColor="hsl(150, 100%, 66%)"
        mb="2rem"
        fontSize="2rem"
        fontWeight={800}
        id="map"
        zIndex="1"
        bg="white"
      >
        {/* Map will be rendered here */}
      </Box>
      <Flex width={width} height="33rem" position="absolute" direction="column" align="center" mt="2rem" mb="5rem" zIndex="2">
        <Heading textColor="white" mb="1.5rem">
          IP Address Tracker
        </Heading>
        <Flex
          width="23rem"
          height="4rem"
          justifyContent="space-between"
          alignItems="center"
          textAlign="left"
          textColor="red"
          mb="2rem"
          fontSize="2rem"
          fontWeight={800}
          borderRadius="10px"
          bg="white"
        >
          <Textarea
            width="100%"
            height="100%"
            rows={2} // 🚩Set the number of rows to control the height
            resize="none" //🚩 Prevents resizing to ensure height is respected
            placeholder="Enter any IP address or domain, or click the button to track your own IP"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            border="none"
            bg="white"
          />
          <Button
            width="3rem"
            height="100%"
            display="flex"
            position="relative"
            justifyContent="center"
            borderRadius="0px 10px 10px 0px"
            alignItems="center"
            bg="black"
            _hover={{ bg: 'hsl(200, 100%, 80%)', boxShadow: '0 0 20px 2px rgba(207, 245, 250, 0.8)' }}
            onClick={handleSearch}
          >
            <img src={arrow} alt="search icon" />
          </Button>
        </Flex>
        <Flex
          width="100%"
          height={flexHeight}
          direction={flexDirection}
          padding="2rem"
          justifyContent="space-between"
          borderRadius="10px"
          bg="white"
        >
          {' '}
          {/* ✅ Use responsive height and direction */}
          <Flex direction="column">
            <Text mb="0.5rem" fontWeight="700" fontSize="1rem" color="grey">
              IP ADDRESS
            </Text>
            <Text height="2rem" id="ip_address" mb="1.5rem">
              {data.ip}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text mb="0.5rem" fontWeight="700" fontSize="1rem" color="grey">
              LOCATION
            </Text>
            <Text height="2rem" id="location" textAlign="center" mb="1.5rem">
              {data.location.city}, {data.location.region}, {data.location.country}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text mb="0.5rem" fontWeight="700" fontSize="1rem" color="grey">
              TIMEZONE
            </Text>
            <Text height="2rem" id="utc" mb="1.5rem">
              UTC {data.location.timezone}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text mb="0.5rem" fontWeight="700" fontSize="1rem" color="grey">
              ISP
            </Text>
            <Text height="2rem" id="isp" mb="1.5rem">
              {data.isp}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
