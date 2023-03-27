import Flex from "../flex/Flex";
import Button from "../button";
import { Text } from "../text/Text";

export default function Pagination({
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
  postsPerPage = 1,
  setPostsPerPage,
}: {
  totalPosts: number;
  paginateFront: () => void;
  paginateBack: () => void;
  currentPage: number;
  postsPerPage: number;
  setPostsPerPage: (value: number) => void;
}) {
  const isBackButtonDisabled = totalPosts - currentPage * postsPerPage <= 0;
  const onChangePostsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(+e.target.value);
  };

  return (
    <Flex
      css={{
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        flexFlow: "column nowrap",
        marginTop: "1rem",
      }}
    >
      <Text css={{ color: "$gray" }}>
        Page
        <Text css={{ color: "black" }}> {currentPage} </Text>
      </Text>
      <Flex css={{ gap: "0.25rem" }}>
        <Text css={{ color: "$gray" }}>Showing</Text>
        <Text>
          {totalPosts < postsPerPage
            ? totalPosts
            : currentPage * postsPerPage - postsPerPage + 1}
        </Text>
        <Text css={{ color: "$gray" }}>to</Text>
        <Text>
          {totalPosts < postsPerPage ? totalPosts : currentPage * postsPerPage}
        </Text>
        <Text css={{ color: "$gray" }}>of</Text>
        <Text> {totalPosts} </Text>
        <Text css={{ color: "$gray" }}>results</Text>
      </Flex>
      <Flex
        as={"nav"}
        css={{ gap: ".5rem", margin: "1rem 0" }}
        aria-label="Pagination"
      >
        <Button
          data-testid="previous-page"
          isDisabled={currentPage === 1}
          onClick={() => {
            paginateBack();
          }}
        >
          <span>Previous</span>
        </Button>
        <select data-testid="change-posts-per-page" onChange={onChangePostsPerPage} value={postsPerPage}>
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
        <Button
          data-testid="next-page"
          isDisabled={isBackButtonDisabled}
          onClick={() => {
            paginateFront();
          }}
        >
          <span>Next</span>
        </Button>
      </Flex>
    </Flex>
  );
}
