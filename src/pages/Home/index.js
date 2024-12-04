import React, { useState } from "react";

export default function Index() {
  // 存放總資料
  const [news, setNews] = useState([
    { title: "土石流", content: "新竹地區坍方", time: "2024-11-29" },
    { title: "颱風", content: "颱風將由花蓮入境", time: "2024-11-28" },
    { title: "台積電", content: "股價暴漲", time: "2024-11-27" },
  ]);
  // 當前或新增的表單資料
  const [formData, setFormData] = useState({ title: "", content: "" });
  // 記錄正在修改的索引
  const [isEditing, setIsEditing] = useState(null);

  // 處理輸入框變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 新增或修改提交
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = {
      title: formData.title,
      content: formData.content,
      // 自動填入當前日期,並處理日期格式
      time: new Date().toISOString().split("T")[0],
    };

    if (isEditing !== null) {
      // 修改消息
      //複製原始資料
      const updatedNews = [...news];
      //改變當前索引資料
      updatedNews[isEditing] = newNews;
      //設定
      setNews(updatedNews);
      // 清除編輯狀態
      setIsEditing(null);
    } else {
      // 新增消息
      setNews([newNews, ...news]);
    }
    // 清空輸入框
    setFormData({ title: "", content: "" });
  };

  // 刪除消息
  const handleDelete = (index) => {
    // 篩選掉當前索引的比數
    const updatedNews = news.filter((_, i) => i !== index);
    setNews(updatedNews);
  };

  // 編輯消息
  const handleEdit = (index) => {
    // 找到當前該筆資料
    const selectedNews = news[index];
    setFormData({ title: selectedNews.title, content: selectedNews.content });
    // 設置為編輯狀態且選擇當前索引
    setIsEditing(index);
  };

  return (
    <>
      <h1>最新消息</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="請輸入標題"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="請輸入內容"
            value={formData.content}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" type="submit">
            {isEditing !== null ? "修改" : "送出"}
          </button>
        </div>
      </form>
      <div className="container">
        <div className="row mt-3">
          <div className="col fs-4">標題</div>
          <div className="col fs-4">內容</div>
          <div className="col fs-4">時間</div>
          <div className="col"></div>
        </div>
        <hr />
        {news.map((v, i) => (
          <div key={i} className="row mb-2">
            <div className="col">{v.title}</div>
            <div className="col">{v.content}</div>
            <div className="col">{v.time}</div>
            <div className="col d-flex">
              <button
                className="btn btn-primary me-2"
                onClick={() => handleEdit(i)}
              >
                修改
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(i)}
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
