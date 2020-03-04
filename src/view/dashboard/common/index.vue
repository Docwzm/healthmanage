<style lang="less">
html{
  font-size:100px;
}
</style>
<style lang="less">
.year-popper {
  border: none;
  .el-select-dropdown__list,
  .el-select-dropdown__item {
    background: rgba(74, 123, 183, 0.5);
  }
}
.dashboard-container {
  min-width:1920px;
  font-family: PingFangSC-Regular, PingFang SC;
  min-height: 100%;
  background: linear-gradient(
    180deg,
    rgba(36, 93, 168, 1) 0%,
    rgba(18, 39, 88, 1) 100%
  );
  white-space: nowrap;
  word-break: break-all;
  box-sizing: border-box;
  font-size: 0;

  .top_arrows {
    width: 0.06rem;
    height: 0.06rem;
    border-top: 1px solid #fd5e45;
    border-right: 1px solid #fd5e45;
    transform: translate(0, -0.04rem) rotate(-45deg);
    margin-right: 0.06rem;
    // margin-top: -0.12rem;
    display: inline-block;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: -1px;
      transform: translate(0.015rem, 0) rotate(45deg);
      width: 1px;
      height: 0.09rem;
      background: #fd5e45;
    }
  }

  .down_arrows {
    width: 0.06rem;
    height: 0.06rem;
    border-top: 1px solid #9ad12f;
    border-right: 1px solid #9ad12f;
    transform: translate(0, -0.01rem) rotate(135deg);
    margin-right: 0.06rem;
    // margin-top: -0.12rem;
    display: inline-block;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: -1px;
      transform: translate(0.025rem, -0.01rem) rotate(45deg);
      width: 1px;
      height: 0.09rem;
      background: #9ad12f;
    }
  }

  .top {
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    position: relative;

    .bg {
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      opacity: 0.13;
    }

    .title {
      font-family: AlibabaPuHuiTiH;
      font-size: 0.38rem;
      color: rgba(255, 255, 255, 1);
    }

    .control-btn {
      position: absolute;
      right: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.3rem;
      height: 0.48rem;
      line-height: 0.48rem;
      background: rgba(216, 216, 216, 0.2);
      border-radius: 0.24rem;
      font-size: 0.19rem;
      color: rgba(255, 255, 255, 0.85);
      padding: 0;
      .icon-control {
        width: 0.16rem;
        height: 0.16rem;
        display: inline-block;
        vertical-align: baseline;
        background-image: url("../../../statics/img/dashboard/icon_back.png");
        background-position: left center;
        background-size: 0.16rem 0.16rem;
      }
    }
  }

  .main {
    padding: 0 0.4rem 0.34rem;
    font-size: 0;

    .left,
    .right {
      overflow: hidden;
    }
  }

  .card-wrap {
    border-radius: 0.08rem;
    padding: 0.15rem 0.17rem 0.1rem 0.2rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.25);
    // border-image: linear-gradient(315deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.25)) 1 1;
    box-sizing: border-box;

    .chart-wrap {
      position: relative;
      margin-right: 0.13rem;
      display: inline-block;
      vertical-align: middle;

      .info {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        p {
          height: 0.35rem;
          font-size: 0.3rem;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 0.35rem;
        }

        span {
          height: 0.14rem;
          font-size: 0.1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(255, 255, 255, 1);
          line-height: 0.14rem;
          display: block;
          margin-top: -0.02rem;
        }
      }
    }

    .legend-wrap {
      display: inline-block;
      vertical-align: middle;

      p {
        margin-bottom: 0.06rem;
        width: 1.26rem;
        height: 0.17rem;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.17rem;

        * {
          display: inline-block;
          vertical-align: middle;
        }

        &::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;
          margin-right: 0.07rem;
        }

        &:first-child {
          &::before {
            background: #0091ff;
          }
        }
        &:nth-child(2n) {
          &::before {
            background: #fd5e45;
          }
        }
        &:last-child {
          &::before {
            background: #9ad12f;
          }
        }
      }

      i {
        float: right;
      }
    }
  }

  .top-title-bar {
    // height: 0.36rem;
    padding: 0.26rem 0 0.15rem 0.5rem;
    // margin: 0.3rem 0 0.2rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    // height             : 0.27rem;
    line-height: 0.36rem;
    background-size: 0.36rem 0.36rem;
    background-repeat: no-repeat;
    background-position: left 0.26rem;

    .title {
      font-size: 0.27rem;
      display: inline-block;
      vertical-align: top;
    }

    .check-detail-btn {
      float: right;
      margin-top: 0.08rem;
    }
  }

  .check-detail-btn {
    height: 0.2rem;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: rgba(255, 255, 255, 1);
  }

  .title-bar {
    font-size: 0;

    span {
      height: 0.28rem;
      font-size: 0.2rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 0.28rem;
      display: inline-block;
    }

    a {
      float: right;
      margin-top: 0.04rem;
    }
  }

  .pie-chart {
    width: 1.61rem;
    height: 1.61rem;
  }

  .line-divide {
    width: 1px;
    height: 1.46rem;
    margin: 0 0.4rem 0 0;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .left {
    margin-right: 0.3rem;
    width: 6.4rem;
    float: left;
    .top-title-bar {
      background-image: url("../../../statics/img/dashboard/Icon_today.png");
    }

    .info-counter-wrap {
      font-size: 0;

      .card {
        display: inline-block;
        height: 1.26rem;
        width: 2.05rem;
        border-radius: 0.02rem;
        margin-right: 0.12rem;
        box-sizing: border-box;
        padding: 0.11rem 0.2rem;

        &:last-child {
          margin-right: 0;
        }

        .title {
          height: 0.28rem;
          font-size: 0.2rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.28rem;
        }

        .counter-wrap {
          margin-top: 0.08rem;
          .per {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.12rem;
          }

          span {
            height: 0.45rem;
            font-size: 0.38rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.45rem;
            margin-right: 0.12rem;
          }

          i {
            height: 0.17rem;
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(253, 94, 69, 1);
            line-height: 0.17rem;

            &.down {
              color: rgba(154, 209, 47, 1);
            }
          }
        }

        .total {
          margin-top: 0.06rem;
          height: 0.17rem;
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.17rem;
        }
      }
    }

    .device-wrap {
      border-radius: 0.08rem;
      margin-top: 0.2rem;
      padding-bottom: 0.21rem;
      font-size: 0;

      .info-wrap,
      .line-divide,
      .device-info,
      .device-chart {
        display: inline-block;
        vertical-align: middle;
      }

      .info-wrap {
        margin-top: 0.12rem;
      }

      .device-chart {
        width: 3.4rem;
      }

      .device-info {
        font-size: 0;
        white-space: initial;
        width: 2.08rem;

        .device {
          display: inline-block;
          vertical-align: middle;
          width: 1.04rem;
          height: 0.4rem;
          padding-left: 0.5rem;
          box-sizing: border-box;
          position: relative;
          background-size: 0.4rem 0.4rem;
          background-repeat: no-repeat;
          background-position: left center;
          font-size: 0.12rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 0.13rem;

          &:nth-child(2n) {
            margin-right: 0;
          }

          &.wristbands {
            background-image: url("../../../statics/img/dashboard/icon_wristbands.png");
          }

          &.watch {
            background-image: url("../../../statics/img/dashboard/icon_watch.png");
          }

          &.bp-dc {
            background-image: url("../../../statics/img/dashboard/icon_bp_cuff.png");
          }

          &.bs-dc {
            background-image: url("../../../statics/img/dashboard/icon_bp_cuff.png");
          }

          &.body-fat-dc {
            background-image: url("../../../statics/img/dashboard/icon_body_fat_chen.png");
          }

          p {
            margin-top: 0.03rem;
            height: 0.17rem;
            font-weight: 600;
            line-height: 0.17rem;
          }

          span {
            display: block;
            margin-top: 0.01rem;
            font-weight: 400;
            height: 0.17rem;
            line-height: 0.17rem;
          }
        }
      }
    }

    .warn-wrap {
      border-radius: 0.08rem;
      margin-top: 0.2rem;
      font-size: 0;
      padding-bottom: 0.2rem;

      .tag-bar {
        text-align: center;
        font-size: 0;
        height: 0.2rem;
        line-height: 0.2rem;
        position: relative;

        .tag {
          display: inline-block;
          font-size: 0.14rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          padding: 0 0.35rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          &::before {
            content: "";
            display: block;
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
          }

          .text {
            display: inline-block;
            padding: 0 0.09rem;
            position: relative;
            z-index: 2;
          }
        }

        .handle-legend-wrap {
          display: inline-block;
          float: right;

          p {
            display: inline-block;
            vertical-align: middle;
            margin-left: 0.18rem;
            height: 0.17rem;
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.17rem;

            &::before {
              content: "";
              display: inline-block;
              vertical-align: middle;
              width: 0.06rem;
              height: 0.06rem;
              margin-right: 0.07rem;
              border-radius: 50%;
              background: #0091ff;
            }

            &:last-child {
              &::before {
                background: #b6b6b6;
              }
            }
          }
        }
      }

      .count-info-wrap,
      .line-divide,
      .spread-info,
      .count-chart {
        display: inline-block;
        vertical-align: middle;
      }

      .count-info-wrap {
        margin-top: 0.08rem;

        .legend-wrap {
          p {
            width: 1.1rem;
          }
        }
      }

      .line-divide {
        margin-right: 0.33rem;
      }

      .count-chart {
        width: 3.4rem;
      }

      .spread-info {
        vertical-align: top;

        .area-item {
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 0.08rem;

          p {
            display: inline-block;
            vertical-align: middle;
          }

          .name {
            width: 1.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &::before {
            content: "";
            display: inline-block;
            vertical-align: middle;
            width: 0.2rem;
            height: 0.2rem;
            background: url("../../../statics/img/dashboard/icon_history.png")
              no-repeat;
            background-size: 100% 100%;
            margin-right: 0.06rem;
          }
        }
      }

      #warn-pie-chart {
      }

      .warn-handle {
        margin-top: 0.23rem;
      }

      .handle-info-wrap {
        margin-top: 0.12rem;
        .guage-chart {
          width: 1.5rem;
          height: 1.5rem;
        }
        .card {
          position: relative;
          width: 1.48rem;
          height: 1.48rem;
          display: inline-block;
          vertical-align: middle;
        }

        .info {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;

          .data {
            font-size: 0;
            text-align: center;

            span {
              display: inline-block;
              vertical-align: baseline;
              font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }

            .num {
              height: 0.35rem;
              font-size: 0.3rem;
              line-height: 0.35rem;
            }

            .unit {
              font-size: 0.15rem;
            }
          }

          .tag {
            height: 0.14rem;
            font-size: 0.1rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.14rem;
          }
        }
      }
    }
  }

  .trend-legend-wrap {
    margin-top: 0.06rem;
    float: right;
    font-size: 0;
    height: 0.17rem;
    line-height: 0.17rem;

    p {
      height: 0.17rem;
      line-height: 0.17rem;
      display: inline-block;
      vertical-align: middle;
      font-size: 0.12rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 0.18rem;

      &::before {
        content: "";
        display: inline-block;
        margin-right: 0.06rem;
        vertical-align: middle;
        background: #f42250;
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
      }

      &:nth-child(2n) {
        &::before {
          background: #0091ff;
        }
      }

      &:nth-child(3n) {
        &::before {
          background: #51e158;
        }
      }
    }
  }

  .right {
    .top-title-bar {
      background-image: url("../../../statics/img/dashboard/icon_history.png");
    }
    .year-select {
      float: right;
      .ant-select-selection--single {
        border: none;
        width: 0.96rem;
        height: 0.32rem;
        line-height: 0.32rem;
        background: rgba(74, 123, 183, 1);
        border-radius: 0.16rem;
        text-align: center;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      span {
        display: inline-block;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-right: 0.07rem;
      }

      i {
        color: #fff;
        font-size: 0.14rem;
      }
    }

    .top-info {
      font-size: 0;

      .card {
        width: 1.95rem;
        padding: 0 0.15rem;
        height: 0.72rem;
        line-height: 0.72rem;
        background: linear-gradient(
          135deg,
          rgba(231, 199, 82, 1) 0%,
          rgba(212, 136, 6, 1) 100%
        );
        border-radius: 0.04rem;
        display: inline-block;
        vertical-align: top;
        margin-right: 0.13rem;
        box-sizing: border-box;
        float: left;

        &:nth-child(2n) {
          width: 3.9rem;
          background: linear-gradient(
            301deg,
            rgba(100, 89, 255, 1) 0%,
            rgba(75, 160, 255, 1) 100%
          );

          .item {
            width: 50%;
          }
        }

        &:nth-child(3n) {
          background: linear-gradient(316deg, #1879b7 0%, #4fd7ff 100%);
          margin-right: 0;
          display: block;
          float: none;
          margin-left: 6.1rem;
          width: auto;

          .item {
            width: 33.3%;
          }
        }

        span,
        .item {
          display: inline-block;
          vertical-align: middle;
        }
      }

      .item {
        // margin-right: 0.25rem;
        padding-right: 0.2rem;
        box-sizing: border-box;

        &:last-child {
          padding-right: 0;
        }
      }

      .tag {
        // width      : 0.73rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(255, 255, 255, 1);
        margin-right: 0.1rem;
      }

      .num {
        // width      : 0.7rem;
        float: right;
        font-size: 0.26rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }

    .trend-wrap {
      margin-top: 0.17rem;
      padding-bottom: 0.16rem;

      .top-bar {
        margin-bottom: 0.16rem;
        height: 0.28rem;
        line-height: 0.28rem;
        font-size: 0;

        .title-bar {
          font-size: 0;
          width: 9.22rem;
          margin-right: 0.55rem;
          display: inline-block;
          vertical-align: middle;

          .title {
            float: left;
            font-size: 0.2rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }

        .tab-wrap {
          display: inline-block;
          vertical-align: middle;
          height: 0.3rem;
          line-height: 0.3rem;
          width: 1.41rem;
          border-radius: 0.16rem;
          border: 1px solid rgba(74, 123, 183, 1);
          font-size: 0;
          overflow: hidden;

          p {
            cursor: pointer;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            width: 50%;
            border-radius: 0.16rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);

            &.active {
              background: rgba(74, 123, 183, 1);
            }
          }
        }
      }

      #line-chart {
        width: 9.22rem;
        height: 2.75rem;
      }

      .line-chart-wrap,
      .info-card {
        display: inline-block;
        vertical-align: top;
      }

      .info-card {
        padding: 0.23rem 0.18rem 0;
        margin-left: 0.3rem;
        width: 1.75rem;
        height: 2.75rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.02rem;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.13),
            rgba(255, 255, 255, 0.13),
            rgba(255, 255, 255, 0)
          )
          1 1;
        box-sizing: border-box;

        .title {
          text-align: center;
          height: 0.23rem;
          font-size: 0.2rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.28rem;
          margin-bottom: 0.18rem;

          &::before {
            content: "";
            display: inline-block;
            vertical-align: baseline;
            width: 0.1rem;
            height: 0.1rem;
            margin-right: 0.05rem;
            border-radius: 50%;
            background: #0091ff;
          }
        }

        .item {
          margin-bottom: 0.15rem;

          .num,
          .percent {
            display: inline-block;
            vertical-align: baseline;
            height: 0.33rem;
            font-size: 0.24rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.28rem;
          }

          .percent {
            float: right;
          }

          .tag {
            height: 0.23rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }

  .bot-wrap {
    margin-top: 0.2rem;

    .card-wrap {
      display: inline-block;
      vertical-align: top;
    }

    .disease-control-wrap {
      float: left;
      width: 3.9rem;
      height: 4rem;
      box-sizing: border-box;

      .bar-chart-container {
        position: relative;
      }

      .x-line-wrap {
        position: absolute;
        bottom: -0.17rem;
        left: 0;
        font-size: 0;
        height: 0.17rem;
        width: 3.07rem;

        .per {
          width: 25%;
          height: 0.17rem;
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.17rem;
          display: inline-block;
          text-align: center;
          transform: translateX(-50%);

          &:first-child {
            text-align: left;
            transform: none;
          }

          &:last-child {
            text-align: right;
            transform: translateX(-100%);
          }
        }
      }

      .y-line-wrap {
        width: 3.07rem;
        position: absolute;
        top: 0.14rem;
        bottom: 0.05rem;

        .line {
          position: absolute;
          left: 25%;
          top: 0;
          bottom: 0;
          width: 1px;
          border-right: 1px dashed rgba(255, 255, 255, 0.1);

          &:nth-child(2n) {
            left: 50%;
            top: 0;
          }

          &:nth-child(3n) {
            left: 75%;
            top: 0;
          }

          &:nth-child(4n) {
            left: 100%;
            top: 0;
            margin-left: -1px;
          }
        }
      }

      .bar-chart-wrap {
        .bar-chart-item {
          margin-bottom: 0.05rem;

          .bar-chart {
            p {
              background: linear-gradient(
                180deg,
                rgba(246, 32, 84, 1) 0%,
                rgba(226, 62, 13, 1) 100%
              );
            }
          }

          &:nth-of-type(2n) {
            .bar-chart {
              p {
                background: linear-gradient(
                  180deg,
                  rgba(0, 207, 239, 1) 0%,
                  rgba(0, 133, 227, 1) 100%
                );
              }
            }
          }

          &:nth-of-type(3n) {
            .bar-chart {
              p {
                background: linear-gradient(
                  180deg,
                  rgba(117, 230, 85, 1) 0%,
                  rgba(0, 214, 93, 1) 100%
                );
              }
            }
          }
        }

        .bar-chart-box {
          overflow: hidden;
          margin-top: 0.2rem;

          .title {
            margin-bottom: 0.09rem;
            height: 0.14rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 0.14rem;
          }

          .bar-chart {
            display: inline-block;
            vertical-align: middle;
            width: 3.07rem;
            height: 0.16rem;
            background: rgba(50, 80, 132, 1);
            border-radius: 0.02rem;

            p {
              height: 0.16rem;

              box-shadow: 0 0 0.09rem 0 rgba(255, 255, 255, 0.2);
              border-radius: 0.02rem;
            }
          }

          .data {
            margin-left: 0.1rem;
            display: inline-block;
            vertical-align: middle;
            height: 0.16rem;
            font-size: 0.16rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.16rem;
          }
        }
      }
    }

    .community-health-wrap {
      // width   :100%;
      display: block;
      margin-left: 4.1rem;
      height: 4rem;

      .table-wrap {
        margin-top: 0.18rem;
        overflow:hidden;
      }

      .community-table {
        background: none;
        border: none;
        th,td{
          background:none;
          border:none;
        }
        .ant-table-thead{
          background:rgba(255,255,255,0.1);
          border-radius:2px;
        }
        .ant-table-thead th{
          font-size:0.13rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(228,192,74,1);
          height: 0.48rem;
          padding: 0 0 0 0.11rem;
        }
        .ant-table-tbody tr:first-child{
          td:first-child{
              background:url('../../../statics/img/dashboard/num_1.png');
              background-size:0.14rem 0.2rem;
              background-repeat:no-repeat;
              background-position:left center;
          }
        }
        .ant-table-tbody tr:nth-child(2){
          td:first-child{
              background:url('../../../statics/img/dashboard/num_2.png');
              background-size:0.14rem 0.2rem;
              background-repeat:no-repeat;
              background-position:left center;
          }
        }
        .ant-table-tbody tr:nth-child(3){
          td:first-child{
              background:url('../../../statics/img/dashboard/num_3.png');
              background-size:0.14rem 0.2rem;
              background-repeat:no-repeat;
              background-position:left center;
          }
        }
        .ant-table-tbody td{
          font-size:0.12rem;
          font-family:PingFangSC-Regular,PingFang SC;
          color:rgba(255,255,255,1);
          height: 0.36rem;
          padding: 0 0 0 0.11rem;
          &:first-child{
              padding-left:0.2rem;
          }
          .td-col8{
            font-size:0.17rem;
            font-family:DINAlternate-Bold,DINAlternate;
            font-weight:bold;
            color:rgba(93,141,228,1);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="dashboard-container">
    <div class="top">
      <div class="bg"></div>
      <p class="title">罗湖医院数据大屏</p>
      <a-button class="control-btn" @click="gotoControl">
        <i class="icon-control"></i>
        控制台
      </a-button>
    </div>
    <div class="main">
      <div class="left">
        <div class="top-title-bar">
          <p class="title">今日数据 2020-01-04</p>
          <a class="check-detail-btn" href>查看详情 &gt;</a>
        </div>
        <div class="info-counter-wrap">
          <div class="card card-wrap">
            <p class="title">筛查人数</p>
            <div class="counter-wrap">
              <span>849</span>
              <div class="per">
                <div class="top_arrows"></div><i>20%</i>
              </div>
            </div>
            <p class="total">本月累计 128,234人</p>
          </div>
          <div class="card card-wrap">
            <p class="title">发现人数</p>
            <div class="counter-wrap">
              <span>849</span>
              <div class="per">
                <div class="top_arrows"></div><i>20%</i>
              </div>
            </div>
            <p class="total">本月累计 128,234人</p>
          </div>
          <div class="card card-wrap">
            <p class="title">管理人数</p>
            <div class="counter-wrap">
              <span>849</span>
              <div class="per">
                <div class="down_arrows"></div><i class="down">20%</i>
              </div>
            </div>
            <p class="total">本月累计 128,234人</p>
          </div>
        </div>
        <div class="device-wrap card-wrap">
          <div class="title-bar">
            <span>设备使用</span>
            <a class="check-detail-btn" href>查看详情 &gt;</a>
          </div>
          <div class="info-wrap">
            <div class="device-chart">
              <div class="chart-wrap">
                <div class="pie-chart" id="divece-pie-chart"></div>
                <div class="info">
                  <p class="count">7633</p>
                  <span>设备激活</span>
                </div>
              </div>
              <div class="legend-wrap">
                <p>
                  <span>未使用</span>
                  <i>12314人</i>
                </p>
                <p>
                  <span>使用1次</span>
                  <i>12314人</i>
                </p>
                <p>
                  <span>使用≥2次</span>
                  <i>12314人</i>
                </p>
              </div>
            </div>
            <div class="line-divide"></div>
            <div class="device-info">
              <div class="watch device">
                <p>手环</p>
                <span>1233人</span>
              </div>
              <div class="wristbands device">
                <p>手表</p>
                <span>1233人</span>
              </div>
              <div class="bp-dc device">
                <p>血压计</p>
                <span>1233人</span>
              </div>
              <div class="bs-dc device">
                <p>血糖仪</p>
                <span>1233人</span>
              </div>
              <div class="body-fat-dc device">
                <p>体脂秤</p>
                <span>1233人</span>
              </div>
            </div>
          </div>
        </div>
        <div class="warn-wrap card-wrap">
          <div class="title-bar">
            <span>预警情况</span>
            <a class="check-detail-btn" href>查看详情 &gt;</a>
          </div>
          <div class="tag-bar">
            <div class="tag">
              <span class="text">预警数量及分布</span>
            </div>
          </div>
          <div class="count-info-wrap">
            <div class="count-chart">
              <div class="chart-wrap">
                <div class="pie-chart" id="warn-pie-chart"></div>
                <div class="info">
                  <p class="count">7633</p>
                  <span>预警总数</span>
                </div>
              </div>
              <div class="legend-wrap">
                <p>
                  <span>高血压</span>
                  <i>12314人</i>
                </p>
                <p>
                  <span>糖尿病</span>
                  <i>12314人</i>
                </p>
                <p>
                  <span>其他</span>
                  <i>12314人</i>
                </p>
              </div>
            </div>
            <div class="line-divide"></div>
            <div class="spread-info">
              <div class="area-item">
                <p class="name">新围社康中心</p>
                <p class="count">2310人</p>
              </div>
              <div class="area-item">
                <p class="name">新围社康中心</p>
                <p class="count">2310人</p>
              </div>
              <div class="area-item">
                <p class="name">新围社康中心</p>
                <p class="count">2310人</p>
              </div>
            </div>
          </div>
          <div class="tag-bar warn-handle">
            <div class="tag">
              <span class="text">预警处理情况</span>
            </div>
            <div class="handle-legend-wrap">
              <p>已处理</p>
              <p>未处理</p>
            </div>
          </div>
          <div class="handle-info-wrap">
            <div class="card">
              <canvas width="300" height="300" class="guage-chart" id="guage-chart-1"></canvas>
              <div class="info">
                <p class="data">
                  <span class="num">48</span>
                  <span class="unit">%</span>
                </p>
                <p class="tag">总处理率</p>
              </div>
            </div>
            <div class="card">
              <canvas width="300" height="300" class="guage-chart" id="guage-chart-2"></canvas>
              <div class="info">
                <p class="data">
                  <span class="num">90</span>
                  <span class="unit">%</span>
                </p>
                <p class="tag">高血压</p>
              </div>
            </div>
            <div class="card">
              <canvas width="300" height="300" class="guage-chart" id="guage-chart-3"></canvas>
              <div class="info">
                <p class="data">
                  <span class="num">48</span>
                  <span class="unit">%</span>
                </p>
                <p class="tag">糖尿病</p>
              </div>
            </div>
            <div class="card">
              <canvas width="300" height="300" class="guage-chart" id="guage-chart-4"></canvas>
              <div class="info">
                <p class="data">
                  <span class="num">48</span>
                  <span class="unit">%</span>
                </p>
                <p class="tag">其他</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top-title-bar">
          <p class="title">历史数据概览</p>
          <a-select class="year-select" popper-class="year-popper" :value="selectYear" @change="changeYear">
            <a-select-option value="2020">2020</a-select-option>
            <a-select-option value="2019">2019</a-select-option>
          </a-select>
        </div>

        <div class="top-info">
          <div class="card">
            <span class="tag">年任务总量</span>
            <span class="num">13500</span>
          </div>
          <div class="card">
            <div class="item">
              <span class="tag">筛查数</span>
              <span class="num">13500</span>
            </div>
            <div class="item">
              <span class="tag">筛查数</span>
              <span class="num">13500</span>
            </div>
          </div>
          <div class="card">
            <div class="item">
              <span class="tag">筛查数</span>
              <span class="num">13500</span>
            </div>
            <div class="item">
              <span class="tag">筛查数</span>
              <span class="num">13500</span>
            </div>
            <div class="item">
              <span class="tag">筛查数</span>
              <span class="num">13500</span>
            </div>
          </div>
        </div>

        <div class="trend-wrap card-wrap">
          <div class="top-bar">
            <div class="title-bar">
              <span class="title">整体趋势</span>
              <div class="trend-legend-wrap">
                <p>管理率</p>
                <p>规范率</p>
                <p>控制率</p>
              </div>
            </div>
            <div class="tab-wrap">
              <p v-for="(item,index) in trendTimeRange" :key="index"
                @click="changeTrendTimeRange(item.name)"
                :class="currentTrendTimeRange===item.name?'active':''">{{item.text}}</p>
            </div>
          </div>
          <div class="line-chart-wrap">
            <div id="line-chart" style="width:9.22rem;height:2.75rem"></div>
          </div>
          <div class="info-card">
            <p class="title">2020年 9月</p>
            <div class="item">
              <p class="tag">管理数</p>
              <div class="info">
                <p class="num">6192</p>
                <p class="percent">67%</p>
              </div>
            </div>
            <div class="item">
              <p class="tag">规范数</p>
              <div class="info">
                <p class="num">6192</p>
                <p class="percent">67%</p>
              </div>
            </div>
            <div class="item">
              <p class="tag">控制数</p>
              <div class="info">
                <p class="num">6192</p>
                <p class="percent">67%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bot-wrap">
          <div class="disease-control-wrap card-wrap">
            <div class="title-bar">
              <span class="title">病种控制-9月</span>
              <div class="trend-legend-wrap">
                <p>管理率</p>
                <p>规范率</p>
                <p>控制率</p>
              </div>
            </div>
            <div class="bar-chart-container">
              <div class="y-line-wrap">
                <p class="line"></p>
                <p class="line"></p>
                <p class="line"></p>
                <p class="line"></p>
              </div>
              <div class="x-line-wrap">
                <p class="per">0%</p>
                <p class="per">25%</p>
                <p class="per">50%</p>
                <p class="per">75%</p>
                <p class="per">100%</p>
              </div>
              <div class="bar-chart-wrap">
                <div class="bar-chart-box">
                  <p class="title">高血压</p>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                </div>
                <div class="bar-chart-box">
                  <p class="title">糖尿病</p>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                </div>
                <div class="bar-chart-box">
                  <p class="title">其他</p>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                  <div class="bar-chart-item">
                    <div class="bar-chart">
                      <p style="width:63%"></p>
                    </div>
                    <span class="data">63%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="community-health-wrap card-wrap">
            <div class="title-bar">
              <span class="title">社康管理情况-9月</span>
              <a class="check-detail-btn" href>查看详情 &gt;</a>
            </div>
            <div class="table-wrap">
            <a-table class="community-table" rowKey="id" :dataSource="data" :pagination="pagination">
              <a-table-column dataIndex="col1" key="col1">
                <span slot="title" style="color: #fff">机构名称</span>
                <template slot-scope="col1">
                  <span>{{col1}}</span>
                </template>
              </a-table-column>
              <a-table-column dataIndex="col2" key="col2">
                <span slot="title" style="color: #E4C04A">任务数</span>
              </a-table-column>
              <a-table-column dataIndex="col3" key="col3">
                <span slot="title" style="color: #A19BFF">筛查数</span>
              </a-table-column>
              <a-table-column dataIndex="col4" key="col4">
                <span slot="title" style="color: #A19BFF">发现数</span>
              </a-table-column>
              <a-table-column dataIndex="col5" key="col5">
                <span slot="title" style="color: #57D0FF">管理数</span>
              </a-table-column>
              <a-table-column dataIndex="col6" key="col6">
                <span slot="title" style="color: #57D0FF">规范数</span>
              </a-table-column>
              <a-table-column dataIndex="col7" key="col7">
                <span slot="title" style="color: #57D0FF">控制数</span>
              </a-table-column>
              <a-table-column dataIndex="col8" key="col8">
                <span slot="title" style="color: #5C8CE3">依从率</span>
                <template slot-scope="col8">
                  <span class="td-col8">{{col8}}</span>
                </template>
              </a-table-column>
            </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "dashboard",
  data() {
    return {
      pagination:false,
      selectYear: 2019,
      currentTrendTimeRange: "month",
      trendTimeRange: [
        {
          name: "month",
          text: "月"
        },
        {
          name: "season",
          text: "季"
        }
      ],
      deviceChartData: [
        {
          value: 335,
          name: "未使用",
          color: ["#00CBED", "#048CE4"]
        },
        {
          value: 135,
          name: "使用1次",
          color: ["#F52153", "#E33D0F"]
        },
        {
          value: 1548,
          name: "使用≥2次",
          color: ["#03D65C", "#70E555"]
        }
      ],
      warnChartData: [
        {
          value: 335,
          name: "高血压",
          color: ["#00CBED", "#048CE4"]
        },
        {
          value: 135,
          name: "糖尿病",
          color: ["#F52153", "#E33D0F"]
        },
        {
          value: 1548,
          name: "其他",
          color: ["#03D65C", "#70E555"]
        }
      ],
      data:[
        {
          id:1,
          col1: '新围社康中心',
          col2: '20000',
          col3: '20000',
          col4: '20000',
          col5: '20000',
          col6: '20000',
          col7: '20000',
          col8: '67%'
        },
        {
          id:2,
          col1: '新围社康中心',
          col2: '20000',
          col3: '20000',
          col4: '20000',
          col5: '20000',
          col6: '20000',
          col7: '20000',
          col8: '67%'
        },
        {
          id:3,
          col1: '新围社康中心',
          col2: '20000',
          col3: '20000',
          col4: '20000',
          col5: '20000',
          col6: '20000',
          col7: '20000',
          col8: '67%'
        },
        {
          id:4,
          col1: '新围社康中心',
          col2: '20000',
          col3: '20000',
          col4: '20000',
          col5: '20000',
          col6: '20000',
          col7: '20000',
          col8: '67%'
        }
      ]
    };
  },
  beforeRouteEnter (to, from, next) {
    document.getElementsByTagName("html")[0].style.fontSize = "100px";
    next()
  },
  destroyed() {
    document.getElementsByTagName("html")[0].style.fontSize = "16px";
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initLineChart();
      this.initPieChart(
        "divece-pie-chart",
        "device_pie_chart",
        this.deviceChartData
      );
      this.initPieChart(
        "warn-pie-chart",
        "warn_pie_chart",
        this.warnChartData
      );
      this.toCanvas("guage-chart-1", 48, "guage_chart_1");
      this.toCanvas("guage-chart-2", 90, "guage_chart_2");
      this.toCanvas("guage-chart-3", 48, "guage_chart_3");
      this.toCanvas("guage-chart-4", 48, "guage_chart_4");

      window.addEventListener(
        "resize",
        () => {
          this.chart.resize();
          this.device_pie_chart.resize();
          this.warn_pie_chart.resize();
        },
        false
      );
    },
    gotoControl(){
      this.$router.back()
    },
    handlefullscreen() {
      var docElm = document.documentElement;
      //W3C
      if (docElm.requestFullscreen) {
        if (!document.fullscreen) {
          docElm.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        if (!document.mozFullScreen) {
          docElm.mozRequestFullScreen();
        } else {
          document.mozCancelFullScreen();
        }
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        if (!document.webkitIsFullScreen) {
          docElm.webkitRequestFullScreen();
        } else {
          document.webkitCancelFullScreen();
        }
      }
      //IE11
      else if (elem.msRequestFullscreen) {
        if (!document.msFullscreenElement) {
          docElm.msRequestFullscreen();
        } else {
          document.msExitFullscreen();
        }
      }
    },

    changeYear(value) {
      this.selectYear = value;
    },

    changeTrendTimeRange(value) {
      this.currentTrendTimeRange = value;
    },

    renderHeader(h, { column, $index }) {
      let color = "#fff";
      let paddingLeft = 0;
      switch (column.property) {
        case "col1":
          color = "#fff";
          paddingLeft = "0.11rem";
          break;
        case "col2":
          color = "#E4C04A";
          break;
        case "col3":
        case "col4":
          color = "#A19BFF";
          break;
        case "col5":
        case "col6":
        case "col7":
          color = "#57D0FF";
          break;
        case "col8":
          color = "#5C8CE3";
          break;
      }
      return <span style={{ paddingLeft, color }}>{column.label}</span>;
    },

    initLineChart() {
      this.chart = echarts.init(document.getElementById("line-chart"));
      let options = {
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        // },
        grid: {
          top: 10,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            padding: [5, 0, 0, 0]
          },

          type: "category",
          // boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            padding: [0, 10, 0, 0]
            // interval:49
          },
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              // color: ['#fff'],
              opacity: 0.1
            }
          },
          type: "value"
        },
        series: [
          {
            name: "管理率",
            type: "line",
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#F75F59",
                lineStyle: {
                  color: "#F75F59"
                }
              },
              emphasis: {
                color: "#fff",
                borderWidth: 2,
                shadowColor: "#F75F59",
                shadowBlur: 5,
                borderColor: "#F75F59"
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 320, 332, 301, 334, 399]
          },
          {
            name: "规范率",
            type: "line",
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#32C5FF", //改变折线点的颜色
                lineStyle: {
                  color: "#32C5FF"
                }
              },
              emphasis: {
                color: "#fff",
                borderWidth: 2,
                shadowColor: "#32C5FF",
                shadowBlur: 5,
                borderColor: "#32C5FF"
              }
            },
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]
          },
          {
            name: "控制率",
            type: "line",
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#6DD400", //改变折线点的颜色
                lineStyle: {
                  color: "#6DD400"
                }
              },
              emphasis: {
                color: "#fff",
                borderWidth: 2,
                shadowColor: "#6DD400",
                shadowBlur: 5,
                borderColor: "#6DD400"
              }
            },
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              320,
              332,
              301,
              334,
              390
            ]
          }
        ]
      };
      this.chart.setOption(options);
    },

    initPieChart(dom, name, data) {
      data = data.map(item => {
        item.itemStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: item.color[0] },
              // {offset: 0.5, color: '#048CE4'},
              { offset: 1, color: item.color[1] }
            ])
          }
        };
        return item;
      });
      this[name] = echarts.init(document.getElementById(dom));
      let option = {
        // backgroundColor:'#fff',
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          position: "right"
        },
        series: [
          {
            // name: '访问来源',
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 5
              }
            },

            //         // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
            //         // color: {
            //         //     type: 'radial',
            //         //     x: 0.5,
            //         //     y: 0.5,
            //         //     r: 0.5,
            //         //     colorStops: [{
            //         //         offset: 0, color: 'red' // 0% 处的颜色
            //         //     }, {
            //         //         offset: 1, color: 'blue' // 100% 处的颜色
            //         //     }],
            //         //     global: false // 缺省为 false
            //         // }
            //         // opacity:0.1,
            //     // borderWidth:6, //设置border的宽度有多大
            //     // borderColor:'rgba(255, 255, 255, 0)',
            //     }
            // },
            data
          }
        ]
      };

      this[name].setOption(option);
    },

    toCanvas(id, progress, name) {
      //canvas进度条
      this[name] = document.getElementById(id);
      this[name].addEventListener("mousemove", event => {
        var x = event.clientX - this[name].getBoundingClientRect().left;
        var y = event.clientY - this[name].getBoundingClientRect().top;
        console.log(x);
        console.log(y);
        console.log(this[name + "_ctx"]);
        console.log("...////////");
      });

      this[name + "_ctx"] = this[name].getContext("2d");
      let percent = progress, //最终百分比
        circleX = this[name].width / 2, //中心x坐标
        circleY = this[name].height / 2, //中心y坐标
        radius = 100, //圆环半径
        lineWidth = 30, //圆形线条的宽度
        fontSize = 20; //字体大小

      let ctx = this[name + "_ctx"];
      //两端圆点
      // function smallcircle1(cx, cy, r) {
      //     ctx.beginPath();
      //     //ctx.moveTo(cx + r, cy);
      //     ctx.lineWidth = 1;
      //     ctx.fillStyle = '#06a8f3';
      //     ctx.arc(cx, cy, r, 0, Math.PI * 2);
      //     ctx.fill();
      // }
      // function smallcircle2(cx, cy, r) {
      //     ctx.beginPath();
      //     //ctx.moveTo(cx + r, cy);
      //     ctx.lineWidth = 1;
      //     ctx.fillStyle = '#00f8bb';
      //     ctx.arc(cx, cy, r, 0, Math.PI * 2);
      //     ctx.fill();
      // }

      //画圆
      function circle(cx, cy, r) {
        ctx.beginPath();
        //ctx.moveTo(cx + r, cy);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.arc(cx, cy, r, (Math.PI * 2) / 3, (Math.PI * 1) / 3);
        ctx.stroke();
      }

      // 画弧线
      function sector(cx, cy, r, startAngle, endAngle, anti) {
        ctx.beginPath();
        //ctx.moveTo(cx, cy + r); // 从圆形底部开始画
        ctx.lineWidth = lineWidth;

        // 渐变色 - 可自定义
        var linGrad = ctx.createLinearGradient(
          circleX - radius - lineWidth,
          circleY,
          circleX + radius + lineWidth,
          circleY
        );
        linGrad.addColorStop(0.0, "#0488E3");
        //linGrad.addColorStop(0.5, '#9bc4eb');
        linGrad.addColorStop(1.0, "#00CDEE");
        ctx.strokeStyle = linGrad;

        //圆弧两端的样式
        // ctx.lineCap = 'round';

        //圆弧
        ctx.arc(
          cx,
          cy,
          r,
          (Math.PI * 2) / 3,
          (Math.PI * 2) / 3 + (endAngle / 100) * ((Math.PI * 5) / 3),
          false
        );
        ctx.stroke();
      }

      //刷新
      function loading() {
        if (process >= percent) {
          clearInterval(circleLoading);
        }

        //清除canvas内容
        ctx.clearRect(0, 0, circleX * 2, circleY * 2);

        //中间的字
        // ctx.font = fontSize + 'px April';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.fillStyle = '#999';
        // ctx.fillText(parseFloat(process).toFixed(0) + '%', circleX, circleY);

        // 圆形
        circle(circleX, circleY, radius);

        //圆弧
        sector(circleX, circleY, radius, (Math.PI * 2) / 3, process);
        //两端圆点
        // smallcircle1(150 + Math.cos(2 * Math.PI / 360 * 120) * 100, 150 + Math.sin(2 * Math.PI / 360 * 120) * 100, 5);
        // smallcircle2(150 + Math.cos(2 * Math.PI / 360 * (120 + process * 3)) * 100, 150 + Math.sin(2 * Math.PI / 360 * (120 + process * 3)) * 100, 5);
        //控制结束时动画的速度
        if (process / percent > 0.9) {
          process += 0.4;
        } else if (process / percent > 0.8) {
          process += 0.75;
        } else if (process / percent > 0.7) {
          process += 0.95;
        } else {
          process += 1.0;
        }
      }

      var process = 0.0; //进度
      var circleLoading = window.setInterval(function() {
        loading();
      }, 20);
    }
  }
};
</script>
