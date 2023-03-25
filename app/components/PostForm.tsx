import Input from '~/components/Input';
import Editor from '~/components/Editor';
import { useState } from 'react';
import PostSaveButton from '~/components/PostSaveButton';
import PostTitleInput from '~/components/PostTitleInput';

type Props = {
  /**
   * The title of the post (if available).
   */
  title?: string;

  /**
   * The content of the post (if available).
   */
  content?: string;
};

export function PostForm({ title, content }: Props) {
  const [dirty, setDirty] = useState(false);

  const dirtyHandler = () => {
    setDirty(true);
  };

  return (
    <div className="h-full space-y-6">
      <div className="w-1/2">
        <PostTitleInput
          name="post_title"
          form="post_form"
          defaultValue={title}
          onInput={dirtyHandler}
        />
      </div>

      <Editor
        name="post_content"
        action="/api/posts/new"
        formID="post_form"
        initialValue={content}
        imageUploadUrl="/api/images/upload"
        formIsDirty={dirty}
        saveButton={(dirty) => <PostSaveButton dirty={dirty} />}
      />
    </div>
  );
}
