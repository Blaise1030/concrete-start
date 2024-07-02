import { createSignal } from 'solid-js';
import { showToast } from '~/components/ui/toast';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = createSignal(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        showToast({ title: "Text copied to your clipboard !", description: `Copied "${text}"` })
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return [isCopied, copyToClipboard];
};

export default useCopyToClipboard;