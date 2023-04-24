import { useAppDispatch, useAppSelector } from "@/store-hooks";
import { useEffect } from "react";
import { getPostsHttp, reset } from "./posts-slice";
import { Button, Popconfirm, Space, Table, Tag, Typography, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Post } from "./api";

export default function Posts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  const total = useAppSelector(state => state.posts.total);
  const pageNumber = useAppSelector(state => state.posts.pageNumber);
  const pageSize = useAppSelector(state => state.posts.pageSize);
  const loading = useAppSelector(state => state.ui.loading);
  const { Column } = Table;
  useEffect(() => {
    const controller = dispatch(getPostsHttp({ pageNumber, pageSize }));

    return () => {
      controller.abort();
      dispatch(reset());
    };
  }, []);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button type="primary">新增列表</Button>
      <Table
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={{
          total: total,
          current: pageNumber,
          pageSize: pageSize
        }}
        scroll={{ y: 500 }}
        onChange={pagination =>
          dispatch(
            getPostsHttp({ pageNumber: pagination.current!, pageSize: pagination.pageSize! })
          )
        }
      >
        <Column title="文章索引" dataIndex="id" key="id"></Column>
        <Column title="文章标题" dataIndex="title" key="title" />
        <Column
          title="文章标签"
          dataIndex="tags"
          key="tags"
          width="35%"
          render={(_: any, { tags }: { tags: string[] }) => {
            return tags.map(tag => <Tag key={tag}>{tag}</Tag>);
          }}
        />
        <Column
          title="操作"
          key="action"
          width="10%"
          render={(_: any, post: Post) => {
            return (
              <Space>
                <Popconfirm
                  title="删除文章"
                  description="您确定要删除此文章吗？"
                  okText="确认"
                  onConfirm={() => message.success("删除成功")}
                  onCancel={() => message.error("删除失败")}
                  cancelText="取消"
                >
                  <Typography.Link>
                    <DeleteOutlined />
                  </Typography.Link>
                </Popconfirm>
              </Space>
            );
          }}
        />
      </Table>
    </Space>
  );
}
