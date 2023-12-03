import { FormLabel } from "@chakra-ui/react";
export const Label = (props: any) => {
  const { value } = props;
  return (
    <FormLabel
      sx={{
        color: "#5D5871",
        fontSize: 14,
        mt: 5,
        fontWeight: "400",
      }}
    >
      {" "}
      {value}{" "}
    </FormLabel>
  );
};
