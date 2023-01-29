import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";

import { Post as PostType } from "@/models/post.model";

import Layout from "../../components/layout";
import Date from "../../components/date";

import { getAllPostIds, getPostData } from "../../lib/posts";

type Props = {
  postData: PostType;
};
export default function Post({ postData }: Props) {
  return (
    <Layout>
      <>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type StaticProps = {
  params: PostType;
};
export async function getStaticProps({ params }: StaticProps) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
