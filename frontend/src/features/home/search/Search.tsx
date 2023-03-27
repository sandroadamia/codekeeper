import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import Grid from "../../../components/grid";
import Input from "../../../components/input";
import { Text } from "../../../components/text/Text";
import Separator from "../../../components/separator";
import YearDropdown from "../../../components/yearPicker/YearDropdown";
import { validationSchema } from "../schema";
import Form from "../../../components/form/Form";
import { setFormValues } from "../reducer";
import usePartialSearchParams from "../hooks/usePartialSearchParams";
import useFilters from "../hooks/useFilters";

const Search = () => {
  const [searchParams, setSearchParams] = usePartialSearchParams();
  const START_YEAR_MIN_DATE = new Date("1920").getFullYear();
  const END_YEAR_MAX_DATE = new Date().getFullYear();

  const dispatch = useDispatch();
  const filters = useFilters();
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    q?: string;
    startYear?: number;
    endYear?: number;
    page?: number;
    postsPerPage?: number;
  }>({
    values: filters,
    resolver: yupResolver(validationSchema),
  });

  const [startYearMaxDate, setStartYearMaxDate] = useState<number | null>(
    filters.endYear
      ? +filters.endYear
      : END_YEAR_MAX_DATE
  );
  const [endYearMinDate, setEndYearMinDate] = useState<number | null>(
    filters.startYear
      ? +filters.startYear
      : START_YEAR_MIN_DATE
  );

  const handleOnChange = (
    setStateAction: React.Dispatch<React.SetStateAction<number>>,
    fieldName: "startYear" | "endYear",
    value?: number,
  ) => {
    setStateAction(value);
    setValue(fieldName, value);
  };

  const onSubmit = (data: {
    q?: string;
    startYear?: number;
    endYear?: number;
    page: number;
    postsPerPage: number;
  }) => {
    dispatch(setFormValues(data));
    setSearchParams({
      q: data.q,
      startYear: data.startYear?.toString(),
      endYear: data.endYear?.toString(),
    });
  };

  useEffect(() => {
    if (!filters.q) {
      reset();
    }
  }, [searchParams]);

  return (
    <Flex
      direction="column"
      css={{
        alignItems: "center",
      }}
    >
      <Flex
        direction="column"
        css={{
          maxWidth: "560px",
          width: "100%",
          margin: "2rem 0",
        }}
      >
        <Text
          variant="heading"
          css={{
            margin: "0 auto",
            textAlign: "center",
            paddingInlineStart: "0.25rem",
            maxWidth: "280px",
          }}
        >
          Explore NASA&apos;s
        </Text>
        <Text
          variant="subHeading"
          css={{
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "1rem",
            paddingInlineStart: "0.25rem",
            maxWidth: "280px",
          }}
        >
          Breathtaking Images
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            css={{
              gridTemplateAreas:
                '"search-input search-input search-input" "options options options" "search-button search-button search-button"',
              '@md': {
                gridTemplateAreas:
                '"search-input search-input search-input" "options options search-button"',
              },
              gridRowGap: "0.5rem",
              gridColumnGap: "0.75rem",
              backgroundColor: "white",
              borderRadius: "$6px",
              padding: "8px",
              width: "max-content",
              background: "#f5f5f5",
            }}
          >
            <Input
              {...register("q")}
              placeholder='Search for (e.g "Cosmos")'
              css={{
                gridArea: "search-input",
              }}
            />
            <Flex
              css={{
                gridArea: "options",
              }}
            >
              <Flex
                css={{
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <YearDropdown
                  minDate={START_YEAR_MIN_DATE}
                  maxDate={startYearMaxDate || END_YEAR_MAX_DATE}
                  onChange={(value) =>
                    handleOnChange(setEndYearMinDate, "startYear", value ? +value: null)
                  }
                  value={filters.startYear?.toString()}
                  label="Start year"
                />
                <Separator data-orientation="vertical" />
                <YearDropdown
                  minDate={endYearMinDate || START_YEAR_MIN_DATE}
                  maxDate={END_YEAR_MAX_DATE}
                  onChange={(value) =>
                    handleOnChange(setStartYearMaxDate, "endYear", value ? +value: null)
                  }
                  value={filters.endYear?.toString()}
                  label="End year"
                />
              </Flex>
            </Flex>
            <Button
              size="large"
              css={{
                gridArea: "search-button",
              }}
              isDisabled={!isValid}
            >
              Browse
            </Button>
          </Grid>
        </Form>
      </Flex>
    </Flex>
  );
};

export default Search;
