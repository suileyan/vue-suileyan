<template>
  <section class="container-page py-12">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold">表单示例</h2>
      <p class="mt-2 text-base-content/60">原生 + Tailwind 简易校验</p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="text-sm text-base-content/60">用户名</label>
          <input
            v-model.trim="model.name"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="请输入"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-error">
            {{ errors.name }}
          </p>
        </div>
        <div>
          <label class="text-sm text-base-content/60">邮箱</label>
          <input
            v-model.trim="model.email"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="you@example.com"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-error">
            {{ errors.email }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-5 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/90">
            提交
          </button>
          <button
            type="button"
            class="px-5 py-2 rounded-lg border border-base-300 text-base-content hover:bg-base-200"
            @click="reset"
          >
            重置
          </button>
        </div>
      </form>
    </div>

    <div class="mt-16 max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold">FormKit 表单演示</h2>
      <p class="mt-2 text-base-content/60">使用 FormKit 组件库的现代化表单</p>

      <div class="mt-6 space-y-4">
        <div>
          <label class="text-sm text-base-content/60">用户名</label>
          <input
            v-model="formKitData.username"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="请输入用户名"
          />
          <p v-if="formKitErrors.username" class="mt-1 text-xs text-error">
            {{ formKitErrors.username }}
          </p>
        </div>

        <div>
          <label class="text-sm text-base-content/60">邮箱</label>
          <input
            v-model="formKitData.email"
            type="email"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="you@example.com"
          />
          <p v-if="formKitErrors.email" class="mt-1 text-xs text-error">
            {{ formKitErrors.email }}
          </p>
        </div>

        <div>
          <label class="text-sm text-base-content/60">密码</label>
          <input
            v-model="formKitData.password"
            type="password"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="请输入密码"
          />
        </div>

        <div>
          <label class="text-sm text-base-content/60">确认密码</label>
          <input
            v-model="formKitData.passwordConfirm"
            type="password"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="请再次输入密码"
          />
        </div>

        <div>
          <label class="text-sm text-base-content/60">性别</label>
          <select
            v-model="formKitData.gender"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:outline-none focus:border-primary"
          >
            <option value="">请选择性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-base-content/60">兴趣爱好</label>
          <div class="mt-2 space-y-2">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="formKitData.hobbies"
                value="coding"
                class="rounded border-base-300"
              />
              <span>编程</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="formKitData.hobbies"
                value="reading"
                class="rounded border-base-300"
              />
              <span>阅读</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="formKitData.hobbies"
                value="sports"
                class="rounded border-base-300"
              />
              <span>运动</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="formKitData.hobbies"
                value="music"
                class="rounded border-base-300"
              />
              <span>音乐</span>
            </label>
          </div>
        </div>

        <div>
          <label class="text-sm text-base-content/60">通知偏好</label>
          <div class="mt-2 space-y-2">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                v-model="formKitData.notification"
                value="instant"
                class="rounded-full border-base-300"
              />
              <span>实时通知</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                v-model="formKitData.notification"
                value="daily"
                class="rounded-full border-base-300"
              />
              <span>每日汇总</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                v-model="formKitData.notification"
                value="none"
                class="rounded-full border-base-300"
              />
              <span>关闭通知</span>
            </label>
          </div>
        </div>

        <div>
          <label class="text-sm text-base-content/60">个人简介</label>
          <textarea
            v-model="formKitData.bio"
            class="mt-1 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
            placeholder="请简单介绍一下自己..."
            rows="4"
          ></textarea>
        </div>

        <div>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="formKitData.terms" class="rounded border-base-300" />
            <span>我已阅读并同意服务条款</span>
          </label>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="submitFormKit"
            class="px-5 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/90"
          >
            提交注册
          </button>
          <button
            type="button"
            class="px-5 py-2 rounded-lg border border-base-300 text-base-content hover:bg-base-200"
            @click="resetFormKit"
          >
            重置表单
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { get } from '@/services/alova';

  const model = reactive({ name: '', email: '' });
  const errors = reactive<{ name?: string; email?: string }>({});

  const formKitData = reactive({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    hobbies: [] as string[],
    notification: '',
    bio: '',
    terms: false,
  });

  const formKitErrors = reactive({
    username: '',
    email: '',
  });

  function validate() {
    errors.name = model.name ? '' : '请输入用户名';
    errors.email = /.+@.+/.test(model.email) ? '' : '邮箱格式不正确';
    return !errors.name && !errors.email;
  }

  async function submit() {
    if (!validate()) return;
    // 请求示例：真实项目中替换为你的接口
    try {
      await get('/demo').send();
      alert('提交成功(演示)');
    } catch (err) {
      alert('提交失败(演示)');
    }
  }

  function reset() {
    model.name = '';
    model.email = '';
    errors.name = '';
    errors.email = '';
  }

  // FormKit 表单验证
  function validateFormKit() {
    formKitErrors.username = formKitData.username ? '' : '请输入用户名';
    formKitErrors.email = /.+@.+/.test(formKitData.email) ? '' : '邮箱格式不正确';

    if (
      formKitData.password &&
      formKitData.passwordConfirm &&
      formKitData.password !== formKitData.passwordConfirm
    ) {
      alert('两次输入的密码不一致');
      return false;
    }

    if (!formKitData.terms) {
      alert('请同意服务条款');
      return false;
    }

    return !formKitErrors.username && !formKitErrors.email;
  }

  // FormKit 表单提交
  async function submitFormKit() {
    if (!validateFormKit()) return;

    console.log('FormKit 表单数据:', formKitData);
    try {
      await get('/demo').send();
      alert('FormKit 表单提交成功！');
    } catch (err) {
      alert('FormKit 表单提交失败');
    }
  }

  // FormKit 表单重置
  function resetFormKit() {
    // Reset formKitData fields to their initial values
    formKitData.username = '';
    formKitData.email = '';
    formKitData.password = '';
    formKitData.passwordConfirm = '';
    formKitData.gender = '';
    formKitData.hobbies = [];
    formKitData.notification = '';
    formKitData.bio = '';
    formKitData.terms = false;

    // 清除错误信息
    Object.keys(formKitErrors).forEach((key) => {
      formKitErrors[key as keyof typeof formKitErrors] = '';
    });
  }
</script>

<route lang="json">
{ "name": "Forms", "meta": { "title": "表单示例" } }
</route>
