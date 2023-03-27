import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Box from "../../components/box";
import Flex from "../../components/flex/Flex";
import { Text } from "../../components/text/Text";
import Image from "../../components/image/Image";
import Error from "../../components/error/Error";
import { useGetAssetByNasaIdQuery } from "../api/nasaService";
import Grid from "../../components/grid";
import { format } from "date-fns";
import { Skeleton } from "../../components/skeleton/Skeleton";
import Button from "../../components/button";
import BackIcon from "../../icons/BackIcon";

const Item = ({
  label,
  text,
  isLoading,
}: {
  label: string;
  text: string;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Skeleton css={{ width: "80%" }} />;
  }
  return (
    text && (
      <Flex
        direction="column"
        css={{
          gap: "0.25rem",
          justifyItems: "center",
        }}
      >
        <Text
          css={{
            fontWeight: "$light",
            fontSize: "$sm",
            color: "#707070",
            width: "110px",
          }}
        >
          {label}
        </Text>
        <Text
          css={{
            fontWeight: "$regular",

            fontSize: "$sm",
            flex: 1,
          }}
        >
          {text}
        </Text>
      </Flex>
    )
  );
};

const Description = ({
  description,
  isLoading,
}: {
  description: string;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          variant={"title"}
          css={{ width: "12rem", marginBottom: "1rem" }}
        />
      ) : (
        <Text
          css={{
            fontSize: "$4xl",
            lineHeight: "$10",
            fontWeight: "$regular",
            margin: "1rem 0",
          }}
          as="h3"
        >
          Description
        </Text>
      )}
      {isLoading ? (
        [...Array(5)].map((e, index) => (
          <Flex
            key={index}
            direction="column"
            css={{
              padding: "0.25rem 0",
              flexFlow: "row nowrap",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Skeleton css={{ width: "100%" }} />
          </Flex>
        ))
      ) : (
        <Flex css={{ '@md': {
          maxWidth: "38.75rem", 
        } }}>
          <Text
            css={{
              fontSize: "$base",
              lineHeight: "$base",
              color: "#616161",
            }}
          >
            {description}
          </Text>
        </Flex>
      )}
    </>
  );
};

const Details = () => {
  const { nasa_id } = useParams();
  const { data, error, isLoading } = useGetAssetByNasaIdQuery(nasa_id);
  const navigate = useNavigate();
  const location = useLocation();
  // const { data, error, isLoading } = {
  //   data: null,
  //   error: null,
  //   isLoading: true,
  // };
  if (error) {
    return <Error />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Flex data-testid="details" css={{ margin: "2rem 2rem" }} direction={"column"}>
      <Flex css={{ margin: "0.75rem 0" }}>
        <Button
          css={{ fontSize: "$xs" }}
          variant="secondary"
          leftPart={<BackIcon />}
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
      </Flex>
      <Grid
        css={{
          gridTemplateColumns: "repeat(12, 1fr)",
          rowGap: "3rem",
          "@md": {
            columnGap: "3rem",
          },
        }}
      >
        <Flex
          direction={"column"}
          css={{
            gridColumn: "span 12 / auto",
            "@md": {
              gridColumn: "span 8 / auto",
            },
            width: "100%",
          }}
        >
          <Flex
            direction={"column"}
            css={{
              background: "#eceef0",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              "@md": {
                padding: "3rem 6.75rem",
              },
            }}
          >
            <Flex
              css={{
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
                width: "100%",
                aspectRatio: "auto 16/9",
                "@md": {
                  maxHeight: "calc(100vh - 26rem)",
                },
              }}
            >
              {isLoading ? null : (
                <Image
                  css={{ width: "100%", height: "100%", objectFit: "contain" }}
                  src={data.image}
                />
              )}
            </Flex>
          </Flex>
          <Flex
            css={{
              display: "none",
              "@md": {
                display: "block",
              },
              paddingTop: "1rem",
            }}
          >
            <Description
              description={data?.description}
              isLoading={isLoading}
            />
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          css={{
            gap: "0.25rem",
            gridColumn: "span 12 / auto",
            "@md": {
              gridColumn: "span 4 / auto",
            },
          }}
        >
          {isLoading ? (
            <Skeleton variant={"title"} />
          ) : (
            <Text
              as="h3"
              css={{
                fontWeight: "$regular",
                lineHeight: "$10",
                fontSize: "$4xl",
                textOverflow: "ellipsis",
                margin: "0",
              }}
            >
              {data.title}
            </Text>
          )}
          <Flex
            direction={"column"}
            css={{ marginTop: "1rem", width: "$full", gap: "1.25rem" }}
          >
            {data?.date_created && (
              <Item
                label="Date"
                text={format(new Date(data?.date_created), "yyyy")}
                isLoading={isLoading}
              />
            )}
            <Item
              label="Location"
              text={data?.location}
              isLoading={isLoading}
            />
            <Item
              label="Photographer"
              text={data?.photographer}
              isLoading={isLoading}
            />
          </Flex>
          <Flex direction={"column"} css={{ marginTop: "2rem" }}>
            <>
              {isLoading ? (
                <Skeleton css={{ width: "6rem" }} />
              ) : (
                data.keywords && <Text
                  css={{
                    fontWeight: "$light",
                    fontSize: "$sm",
                    width: "120px",
                    marginBottom: "0.5rem",
                    color: "#707070",
                  }}
                >
                  Keywords
                </Text>
              )}
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <Flex
                    key={index}
                    direction="column"
                    css={{
                      padding: "0.25rem 0",
                      flexFlow: "row nowrap",
                      alignItems: "center",
                      gap: "1rem",
                      width: "100%",
                    }}
                  >
                    <Skeleton css={{ width: "50%" }} />
                  </Flex>
                ))
              ) : (
                <>
                  {data.keywords?.map((keyword, index) => (
                    <Text
                      as="h5"
                      css={{
                        lineHeight: "$shorter",
                        fontSize: "$sm",
                        margin: "0",
                        fontWeight: "$regular",
                      }}
                      key={index}
                    >
                      {keyword}
                    </Text>
                  ))}
                </>
              )}
            </>
          </Flex>
          <Box
            css={{
              "@md": {
                display: "none",
              },
              paddingTop: "1rem",
            }}
          >
            <Description
              description={data?.description}
              isLoading={isLoading}
            />
          </Box>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Details;
