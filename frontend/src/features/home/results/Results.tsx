import { useGetAssetsBySearchTermQuery } from "../../api/nasaService";
import Masonry from "../../../components/masonry/Masonry";
import Flex from "../../../components/flex/Flex";
import { Text } from "../../../components/text/Text";
import Image from "../../../components/image/Image";
import Box from "../../../components/box";
import React from "react";
import type { Item } from "../../api/types";
import Pagination from "../../../components/pagination/Pagination";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import useFilters from "../hooks/useFilters";
import Error from "../../../components/error/Error";

const Loading = () => (
  <Flex
    css={{
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    }}
  >
    Loading...
  </Flex>
);

const Item = ({ item }: { item: Item }) => (
  <Box
    css={{
      marginBottom: "2rem",
      breakInside: "avoid",
      a: {
        all: "unset",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    }}
  >
    <RouterLink to={`details/${item.data[0].nasa_id}`}>
      <Image
        css={{ width: "100%", display: "block" }}
        src={item?.links[0].href}
      />
    </RouterLink>
    <Flex
      direction={"column"}
      css={{ gap: "0.125rem", width: "calc(100% - 1rem)" }}
    >
      <RouterLink to={`details/${item.data[0].nasa_id}`}>
        <Text
          css={{
            fontWeight: "$medium",
            lineHeight: "$sm",
            fontSize: "$sm",
            textOverflow: "ellipsis",
            my: "0.125rem",
          }}
        >
          {item.data[0].title}
        </Text>
      </RouterLink>
      <RouterLink to={`details/${item.data[0].nasa_id}`}>
        <Text
          css={{
            fontSize: "$sm",
            lineHeight: "$sm",
            fontWeight: "$regular",
            color: "#707070",
            fontStyle: "italic",
          }}
        >
          {item.data[0].location}
        </Text>
      </RouterLink>
      <RouterLink to={`details/${item.data[0].nasa_id}`}>
        <Text
          css={{
            fontWeight: "$regular",
            color: "#707070",
            fontSize: "$xs",
          }}
        >
          {item.data[0].photographer}
        </Text>
      </RouterLink>
    </Flex>
  </Box>
);

const Results = () => {
  const filters = useFilters();
  const [, setSearchParams] = useSearchParams();
  const { data, error, isFetching, isLoading } = useGetAssetsBySearchTermQuery(filters, {
    skip: !filters.q,
  });

  if (error) return <Error />;
  if (isFetching || isLoading) return <Loading />;
  if (!filters.q) {
    return null;
  }

  return (
    <Box
      css={{
        width: "100%",
      }}
    >
      <Masonry
        data-testid="masonry"
        css={{
          margin: "0 1.5rem",
          '@md': {
            margin: "0 3rem",
          },
        }}
      >
        {data?.collection.items.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </Masonry>
      <Pagination
        totalPosts={data.collection.metadata.total_hits}
        currentPage={filters.page}
        paginateFront={() =>
          setSearchParams((prev) => {
            const newValue = prev;
            newValue.set("page", String(filters.page + 1));
            return newValue;
          })
        }
        paginateBack={() =>
          setSearchParams((prev) => {
            const newValue = prev;
            newValue.set("page", String(filters.page - 1));
            return newValue;
          })
        }
        postsPerPage={filters.postsPerPage}
        setPostsPerPage={(postsPerPage) => {
          setSearchParams((prev) => {
            const newValue = prev;
            newValue.set("postsPerPage", String(postsPerPage));
            return newValue;
          })
        }}
      />
    </Box>
  );
};

export default Results;
