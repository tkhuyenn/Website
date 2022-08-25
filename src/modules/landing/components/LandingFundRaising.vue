<template>
  <div class="product-detail" id="token-sale">
    <div class="left">
      <img class="img-clock top" src="../../../icons/png/clock-1.png" alt="" />
    </div>

    <div class="right">
      <h1>Đồng hồ cô tiên</h1>
      <div style="display: flex; margin-top: 8px">
        <img class="star mr-1" src="../../../icons/png/star.png" alt="" />
        <img class="star mr-1" src="../../../icons/png/star.png" alt="" />
        <img class="star mr-1" src="../../../icons/png/star.png" alt="" />
        <img class="star mr-1" src="../../../icons/png/star.png" alt="" />
        <img class="star" src="../../../icons/png/star.png" alt="" />
      </div>
      <p class="text-des">Nhà cung cấp: Công ty trách nhiệm hữu hạn ABC</p>
      <p class="text-des">Màu sắc: loang</p>
      <p class="text-des">Chất liệu: gỗ hương</p>

      <p class="price">10,000,000đ</p>
      <div class="bottom">
        <button class="button cursor">Mô tả chi tiết</button>
        <button class="button btn-right cursor">Đánh giá</button>
      </div>
      <div class="bottom">
        <button class="button cursor">Thêm vào giỏ hàng</button>
        <button class="button btn-right cursor">Mua ngay</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
<style lang="scss" scoped>
  .product-detail {
    background: #fff;
    display: flex;
    flex-direction: row;
    // justify-content: space-between;

    .left {
      border-right: 3px solid #af6535;
      padding-right: 40px;
      display: flex;
      flex-direction: column;

      margin-left: 250px;
      .img-clock {
        width: 400px;
        object-fit: cover;
      }
      .bottom {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        justify-content: space-between;
        .button {
          width: 180px;
          height: 50px;
          border-radius: 12px;
          background: #af6535;
          color: #fff;
          font-size: 16px;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-left: 100px;

      h1 {
        font-size: 40px;
        font-style: italic;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 12px;
        color: red;
      }

      .text-des {
        font-size: 18px;
        font-weight: 500;
        line-height: 4;
      }

      .star {
        width: 20px;
      }

      .price {
        font-size: 30px;
        font-weight: 600;
        margin-top: 20px;
      }
      .bottom {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        justify-content: space-between;
        .button {
          width: 180px;
          height: 50px;
          border-radius: 12px;
          background: #af6535;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
</style>
