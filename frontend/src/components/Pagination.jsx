import { Button, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const Pagination = ({ totalPage, onPageSelect }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    onPageSelect(page);
  }, [page]);
  return (
    <HStack wrap="wrap" gap="1" marginTop="10" justifyContent="center">
      <Button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
        marginRight={3}
      >
        Back
      </Button>
      {Array.from({ length: totalPage }, (_, i) => (
        <Button
          key={i}
          variant={page === i + 1 ? "solid" : "outline"}
          colorScheme={page === i + 1 ? "blue" : undefined}
          onClick={() => {
            setPage(i + 1);
            onPageSelect(i + 1);
          }}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPage}
        marginLeft={3}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
