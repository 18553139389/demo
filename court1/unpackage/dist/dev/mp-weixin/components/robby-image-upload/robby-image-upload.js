(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/robby-image-upload/robby-image-upload"],{

/***/ 504:
/*!*************************************************************************!*\
  !*** F:/my/court1/components/robby-image-upload/robby-image-upload.vue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./robby-image-upload.vue?vue&type=template&id=b2c8affe& */ 505);
/* harmony import */ var _robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./robby-image-upload.vue?vue&type=script&lang=js& */ 507);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./robby-image-upload.vue?vue&type=style&index=0&lang=css& */ 509);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);






/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "court1/components/robby-image-upload/robby-image-upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 505:
/*!********************************************************************************************************!*\
  !*** F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=template&id=b2c8affe& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./robby-image-upload.vue?vue&type=template&id=b2c8affe& */ 506);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_template_id_b2c8affe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 506:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=template&id=b2c8affe& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.imageListData, function(path, index) {
    var m0 = _vm.isDragging(index)
    return {
      $orig: _vm.__get_orig(path),
      m0: m0
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 507:
/*!**************************************************************************************************!*\
  !*** F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./robby-image-upload.vue?vue&type=script&lang=js& */ 508);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 508:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _util = __webpack_require__(/*! ../../common/js/util.js */ 31);
var _toast = _interopRequireDefault(__webpack_require__(/*! ../../common/js/toast.js */ 32));
var _global = _interopRequireDefault(__webpack_require__(/*! ../../common/js/global.js */ 33));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'robby-image-upload', props: ['value', 'enableDel', 'enableAdd', 'enableDrag', 'serverUrl', 'formData', 'limit', 'fileKeyName', 'showUploadProgress', 'serverUrlDeleteImage'], data: function data() {return { imageBasePos: { x0: -1, y0: -1, w: -1, h: -1 }, showMoveImage: false, moveImagePath: '',
      moveLeft: 0,
      moveTop: 0,
      deltaLeft: 0,
      deltaTop: 0,
      dragIndex: null,
      targetImageIndex: null,
      imageList: [],
      isDestroyed: false,
      url: _global.default.baseUrl,
      loadImage: [] };

  },
  mounted: function mounted() {
    // this.imageList = []
    // this.imageList = this.value
    // if(this.showUploadProgress === false){
    // 	this.showUploadProgress = false
    // }else{
    // 	this.showUploadProgress = true
    // }
  },
  destroyed: function destroyed() {
    this.isDestroyed = true;
  },
  computed: {
    imageListData: function imageListData() {
      if (this.value) {
        return this.value;
      }
    },
    posMoveImageLeft: function posMoveImageLeft() {
      return this.moveLeft + 'px';
    },
    posMoveImageTop: function posMoveImageTop() {
      return this.moveTop + 'px';
    },
    isShowDel: function isShowDel() {
      if (this.enableDel === false) {
        return false;
      } else {
        return true;
      }
    },
    isShowAdd: function isShowAdd() {
      if (this.enableAdd === false) {
        return false;
      }

      if (this.limit && this.imageList.length >= this.limit) {
        return false;
      }

      return true;
    },
    isDragable: function isDragable() {
      if (this.enableDrag === false) {
        return false;
      } else {
        return true;
      }
    } },

  methods: {
    selectImage: function selectImage() {
      var _self = this;
      if (!_self.imageList) {
        _self.imageList = [];
      }

      uni.chooseImage({
        count: _self.limit ? _self.limit - _self.imageList.length : 999,
        success: function success(e) {
          var imagePathArr = e.tempFilePaths;
          var self = this;
          var datas = {
            uid: uni.getStorageSync('uid') };

          _toast.default.showLoading('上传中...');
          uni.uploadFile({
            url: 'https://24h.haisongzi.com/service/uploadFile', //仅为示例，非真实的接口地址
            filePath: imagePathArr[0],
            name: 'file',
            formData: datas,
            success: function success(uploadFileRes) {
              _toast.default.hideLoading();
              console.log(uploadFileRes);
              var path = JSON.parse(uploadFileRes.data);
              _self.imageList.push(_self.url + path.body.filePath);
            },
            fail: function fail() {
              _toast.default.hideLoading();
            } });

          //如果设置了limit限制，在web上count参数无效，这里做判断控制选择的数量是否合要求
          //在非微信小程序里，虽然可以选多张，但选择的结果会被截掉
          //在app里，会自动做选择数量的限制
          if (_self.limit) {
            var availableImageNumber = _self.limit - _self.imageList.length;
            if (availableImageNumber < imagePathArr.length) {
              uni.showToast({
                title: '图片总数限制为' + _self.limit + '张，当前还可以选' + availableImageNumber + '张',
                icon: 'none',
                mask: false,
                duration: 2000 });

              return;
            }
          }

          //检查服务器地址是否设置，设置即表示图片要上传到服务器
          if (_self.serverUrl) {
            uni.showToast({
              title: '上传进度：0/' + imagePathArr.length,
              icon: 'none',
              mask: false });


            var remoteIndexStart = _self.imageList.length - imagePathArr.length;
            var promiseWorkList = [];
            var keyname = _self.fileKeyName ? _self.fileKeyName : 'upload-images';
            var completeImages = 0;var _loop = function _loop(

            i) {
              promiseWorkList.push(new Promise(function (resolve, reject) {
                var remoteUrlIndex = remoteIndexStart + i;
                uni.uploadFile({
                  url: _self.serverUrl,
                  fileType: 'image',
                  formData: _self.formData,
                  filePath: imagePathArr[i],
                  name: keyname,
                  success: function success(res) {
                    if (res.statusCode === 200) {
                      if (_self.isDestroyed) {
                        return;
                      }

                      completeImages++;

                      if (_self.showUploadProgress) {
                        uni.showToast({
                          title: '上传进度：' + completeImages + '/' + imagePathArr.length,
                          icon: 'none',
                          mask: false,
                          duration: 500 });

                      }
                      console.log('success to upload image: ' + res.data);
                      resolve(res.data);
                    } else {
                      console.log('fail to upload image:' + res.data);
                      reject('fail to upload image:' + remoteUrlIndex);
                    }
                  },
                  fail: function fail(res) {
                    console.log('fail to upload image:' + res);
                    reject('fail to upload image:' + remoteUrlIndex);
                  } });

              }));};for (var i = 0; i < imagePathArr.length; i++) {_loop(i);
            }
            Promise.all(promiseWorkList).then(function (result) {
              if (_self.isDestroyed) {
                return;
              }

              for (var i = 0; i < result.length; i++) {
                _self.imageList.push(result[i]);
              }

              _self.$emit('add', {
                currentImages: imagePathArr,
                allImages: _self.imageList });

              _self.$emit('input', _self.imageList);
            });
          } else {
            // for(let i=0; i<imagePathArr.length;i++){
            // 	_self.imageList.push(imagePathArr[i])
            // }

            _self.$emit('add', {
              currentImages: imagePathArr,
              allImages: _self.imageList });

            _self.$emit('input', _self.imageList);
          }
        },
        fail: function fail() {
          _toast.default.hideLoading();
        } });

    },
    deleteImage: function deleteImage(e) {
      var imageIndex = e.currentTarget.dataset.index;
      var deletedImagePath = this.imageList[imageIndex];
      this.imageList.splice(imageIndex, 1);

      //检查删除图片的服务器地址是否设置，如果设置则调用API，在服务器端删除该图片
      if (this.serverUrlDeleteImage) {
        uni.request({
          url: this.serverUrlDeleteImage,
          method: 'POST',
          data: {
            imagePath: deletedImagePath },

          success: function success(res) {
            console.log(res.data);
          } });

      }

      this.$emit('delete', {
        currentImage: deletedImagePath,
        allImages: this.imageList });

      this.$emit('input', this.imageList);
    },
    previewImage: function previewImage(e) {
      var self = this;
      var imageIndex = e.currentTarget.dataset.index;
      console.log(this.imageList);
      uni.previewImage({
        current: this.imageList[imageIndex],
        indicator: "number",
        loop: "true",
        urls: this.imageList,
        success: function success() {
          // self.imageListData = self.value
          console.log('预览成功');
        } });

    },
    initImageBasePos: function initImageBasePos() {
      var paddingRate = 0.024;
      var _self = this;
      //计算图片基准位置
      uni.getSystemInfo({
        success: function success(obj) {
          var screenWidth = obj.screenWidth;
          var leftPadding = Math.ceil(paddingRate * screenWidth);
          var imageWidth = Math.ceil((screenWidth - 2 * leftPadding) / 4);

          _self.imageBasePos.x0 = leftPadding;
          _self.imageBasePos.w = imageWidth;
          _self.imageBasePos.h = imageWidth;
        } });

    },
    findOverlapImage: function findOverlapImage(posX, posY) {
      var rows = Math.floor((posX - this.imageBasePos.x0) / this.imageBasePos.w);
      var cols = Math.floor((posY - this.imageBasePos.y0) / this.imageBasePos.h);
      var indx = cols * 4 + rows;
      return indx;
    },
    isDragging: function isDragging(indx) {
      return this.dragIndex === indx;
    },
    start: function start(e) {
      console.log(this.isDragable);
      if (!this.isDragable) {
        return;
      }
      this.dragIndex = e.currentTarget.dataset.index;
      this.moveImagePath = this.imageList[this.dragIndex];
      this.showMoveImage = true;

      //计算纵向图片基准位置
      if (this.imageBasePos.y0 === -1) {
        this.initImageBasePos();

        var basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h;
        var currentImageOffsetTop = e.currentTarget.offsetTop;
        this.imageBasePos.y0 = currentImageOffsetTop - basePosY;
      }

      //设置选中图片当前左上角的坐标
      this.moveLeft = e.target.offsetLeft;
      this.moveTop = e.target.offsetTop;
    },
    move: function move(e) {
      if (!this.isDragable) {
        return;
      }
      var touch = e.touches[0];
      this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY);

      //初始化deltaLeft/deltaTop
      if (this.deltaLeft === 0) {
        this.deltaLeft = touch.clientX - this.moveLeft;
        this.deltaTop = touch.clientY - this.moveTop;
      }

      //设置移动图片位置
      this.moveLeft = touch.clientX - this.deltaLeft;
      this.moveTop = touch.clientY - this.deltaTop;
    },
    stop: function stop(e) {
      if (!this.isDragable) {
        return;
      }
      if (this.dragIndex !== null && this.targetImageIndex !== null) {
        if (this.targetImageIndex < 0) {
          this.targetImageIndex = 0;
        }

        if (this.targetImageIndex >= this.imageList.length) {
          this.targetImageIndex = this.imageList.length - 1;
        }
        //交换图片
        if (this.dragIndex !== this.targetImageIndex) {
          this.imageList[this.dragIndex] = this.imageList[this.targetImageIndex];
          this.imageList[this.targetImageIndex] = this.moveImagePath;
        }
      }

      this.dragIndex = null;
      this.targetImageIndex = null;
      this.deltaLeft = 0;
      this.deltaTop = 0;
      this.showMoveImage = false;

      this.$emit('input', this.imageList);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 509:
/*!**********************************************************************************************************!*\
  !*** F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./robby-image-upload.vue?vue&type=style&index=0&lang=css& */ 510);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_robby_image_upload_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 510:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/my/court1/components/robby-image-upload/robby-image-upload.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/robby-image-upload/robby-image-upload.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/robby-image-upload/robby-image-upload-create-component',
    {
        'components/robby-image-upload/robby-image-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(504))
        })
    },
    [['components/robby-image-upload/robby-image-upload-create-component']]
]);                
