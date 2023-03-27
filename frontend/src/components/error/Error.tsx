import Flex from "../flex/Flex";
import {Text} from "../text/Text";

const Error = () => (
  <Flex
    css={{
      width: "$full",
      height: "$full",
      justifyContent: "center",
      alignItems: "$center",
    }}
  >
    <Text>Something went wrong</Text>
  </Flex>
);

export default Error;
