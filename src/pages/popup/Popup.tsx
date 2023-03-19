import cute from "@assets/img/memes/cute.gif";
import cuteStatic from "@assets/img/near_logo.png";
import { Box, HStack, Icon, Image, Switch, Text, useColorModeValue, VStack, Link } from "@chakra-ui/react";
import { useBrowserStorage } from "../libs/hooks";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import Browser from "webextension-polyfill";

const Popup = () => {
  const [priceInjector, setPriceInjector] = useBrowserStorage("local", "settings:priceInjector", true);
  const [tagsInjector, setTagsInjector] = useBrowserStorage("local", "settings:tagsInjector", true);
  const [phishingDetector, setPhishingDetector] = useBrowserStorage("local", "settings:phishingDetector", true);

  return (
    <Box w="xs" py="4" px="4" userSelect="none">
      <VStack>
        <Link href="https://defillama.com/" isExternal>
          <Image src={cuteStatic} alt="Cute Llama" w="14" />
        </Link>
        <Text fontSize="xl" fontWeight="bold">
          Near Web3 Extension
        </Text>
      </VStack>
        {false &&
      <VStack my="5" p="2" w="full" spacing="1.5" borderRadius="lg" bg={useColorModeValue("gray.100", "gray.900")}>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm">Enable address tags on explorers</Text>
          <Switch
            size="sm"
            isChecked={tagsInjector}
            onChange={(e) => {
              setTagsInjector(e.target.checked);
            }}
          />
        </HStack>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm">Enable token prices on explorers</Text>
          <Switch
            size="sm"
            isChecked={priceInjector}
            onChange={(e) => {
              setPriceInjector(e.target.checked);
            }}
          />
        </HStack>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm">Detect phishing websites</Text>
          <Switch
            size="sm"
            isChecked={phishingDetector}
            onChange={(e) => {
              setPhishingDetector(e.target.checked);
              if (!e.target.checked) {
                Browser.action.setIcon({ path: cuteStatic });
              }
            }}
          />
        </HStack>
      </VStack>
        }
      <HStack w="full" spacing="2" justify="center" style={{paddingTop: "10px"}}>
        <Link href="https://github.com/zavodil/near-extension" isExternal>
          <Icon as={FaGithub} w="6" h="6" />
        </Link>
      </HStack>
      <VStack mt="2" w="full" spacing="2" justify="center">
        <Text fontSize="xs">v0.0.1.0</Text>
      </VStack>
    </Box>
  );
};

export default Popup;
