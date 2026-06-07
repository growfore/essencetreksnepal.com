import { decodeHtmlEntities } from "@/lib/html-decoder";

export type AdditionalInfoItem = {
  title: string;
  description: string;
};

export const AdditionalInfoRenderer = ({
  item,
}: {
  item: AdditionalInfoItem;
  index: number;
}) => {
  return (
    <>
      <h2>{item.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: decodeHtmlEntities(item.description),
        }}
      />
    </>
  );
};
