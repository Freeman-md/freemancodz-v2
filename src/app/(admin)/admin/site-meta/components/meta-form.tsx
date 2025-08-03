import MetaFormLink from "./form-types/meta-form-link";
import MetaFormText from "./form-types/meta-form-text";
import MetaFormImage from "./form-types/meta-form-image";
import MetaFormMeta from "./form-types/meta-form-meta";
import MetaFormContact from "./form-types/meta-form-contact";
import MetaFormHeadline from "./form-types/meta-form-headline";
import MetaFormSectionBlocks from "./form-types/meta-form-section-blocks";

type Props = {
  keyName: string;
  type: string;
  value: string;
};

export default function MetaForm({ keyName, type, value }: Props) {
  switch (type) {
    case "link":
      return <MetaFormLink keyName={keyName} value={value} />;
    case "text":
      return <MetaFormText keyName={keyName} value={value} />;
    case "image":
      return <MetaFormImage keyName={keyName} value={value} />;
    case "meta":
      return <MetaFormMeta keyName={keyName} value={value} />;
    case "headline":
      return <MetaFormHeadline keyName={keyName} value={value} />;
    case "contact":
      return <MetaFormContact keyName={keyName} value={value} />;
    case "section_blocks":
      return <MetaFormSectionBlocks keyName={keyName} value={value} />;
    default:
      return <p className="text-sm text-red-500">Unknown meta type: {type}</p>;
  }
}
